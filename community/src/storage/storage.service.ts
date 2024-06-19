import path from 'node:path';

import { Upload } from '@aws-sdk/lib-storage';
import { did } from '@deskbtm/gadgets';
import { InjectKnex } from '@indiebase/nest-knex';
import {
  CreateBucketCommand,
  DeleteBucketCommand,
  GetObjectCommand,
  InjectS3,
  S3Client,
} from '@indiebase/nest-s3';
import { TmplMetaTables } from '@indiebase/server-shared';
import { PrimitiveProject } from '@indiebase/trait';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Knex } from 'knex';
import * as uuid from 'uuid';

import { BucketDTO, FileDTO } from './storage.dto';

export interface UploadBucketOptions {
  signedUrl?: boolean;
  /**
   * Save to the /tmp/ directory, if object not be used, will delete automatically.
   */
  tmp?: boolean;
}

@Injectable()
export class StorageService {
  private readonly logger = new Logger('Storage');
  constructor(
    @InjectS3()
    private readonly s3: S3Client,
    @InjectKnex()
    private readonly knex: Knex,
  ) {}

  public async save(bucket: string, req: FastifyRequest) {
    const files = await req.files();
    const {
      protocol,
      raw: { project },
      hostname,
    } = req;
    const results: FileDTO[] = [];

    for await (const part of files) {
      const { filename, file, fields } = part;
      const { temp } = fields;
      const key = uuid.v4() + path.extname(filename);
      const originalname = encodeURIComponent(filename);
      // const targetBucket =
      //   Number((temp as any)?.value) === 1 ? TMP_BUCKET : bucket;
      try {
        const parallelUploads3 = new Upload({
          client: this.s3,
          params: {
            Bucket: bucket,
            Key: key,
            Body: file,
            Metadata: {
              originalname,
            },
          },
        });
        const { Bucket, Key } = await parallelUploads3.done();

        if (!(Bucket && Key)) {
          continue;
        }

        const searchParams = new URLSearchParams();
        searchParams.append('referenceId', project.namespace);

        results.push({
          url: `${protocol}://${hostname}/v1/storage/${Bucket}/${Key}?${searchParams.toString()}`,
          bucket: Bucket,
          name: Key,
          originalname: filename,
        });
      } catch (error) {
        this.logger.error(error);
        throw new InternalServerErrorException();
      }
    }

    return results;
  }

  public async getBuckets(project: PrimitiveProject): Promise<BucketDTO[]> {
    const { namespace } = project;

    return this.knex
      .withSchema(namespace)
      .select([
        `${TmplMetaTables.buckets}.id`,
        `${TmplMetaTables.buckets}.name`,
        `${TmplMetaTables.buckets}.description`,
        `${TmplMetaTables.buckets}.updatedAt`,
        `${TmplMetaTables.buckets}.createdAt`,
      ])
      .from(TmplMetaTables.buckets);
  }

  public async getFile(bucket: string, key: string) {
    const getCommand = new GetObjectCommand({
      Key: key,
      Bucket: bucket,
    });
    const res = await this.s3.send(getCommand);
    return res;
  }

  public async create(
    name: string,
    description: string,
    project: PrimitiveProject,
  ) {
    // If the insertion throws an error, the following creation of bucket will not be executed.
    // Should execute before seaweedfs.
    await this.knex
      .withSchema(project.namespace)
      .insert({
        name: name,
        description,
      })
      .into(TmplMetaTables.buckets);
    const createBucketCommand = new CreateBucketCommand({
      Bucket: name,
    });
    const [err] = await did(this.s3.send(createBucketCommand));
    if (err) {
      this.logger.error(err);
      if (err.name === 'BucketAlreadyExists') {
        throw new ConflictException({
          message:
            'The requested bucket name is not available. The bucket name can not be an existing collection',
        });
      } else {
        throw new InternalServerErrorException({
          message: err.message,
        });
      }
    }
  }

  public async softDeleteBucket(name: string, project: PrimitiveProject) {
    return this.knex(TmplMetaTables.buckets)
      .withSchema(project.namespace)
      .update('deleted_at', this.knex.fn.now())
      .where({
        name,
      });
  }

  public async deleteBucket(name: string, project: PrimitiveProject) {
    await this.knex(TmplMetaTables.buckets)
      .withSchema(project.namespace)
      .where({
        name,
      })
      .del();
    const deleteBucketCommand = new DeleteBucketCommand({
      Bucket: name,
    });
    const [err] = await did(this.s3.send(deleteBucketCommand));

    if (err) {
      this.logger.error(err);
      switch (err.name) {
        case 'NoSuchBucket':
          throw new NotFoundException({
            message: `No such bucket ${name}`,
          });
        default:
          throw new InternalServerErrorException();
      }
    }
  }
}
