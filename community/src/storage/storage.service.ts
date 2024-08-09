import path from 'node:path';

import { Upload } from '@aws-sdk/lib-storage';
import { did } from '@deskbtm/gadgets';
import { MultipartFile } from '@fastify/multipart';
import { InjectKnex } from '@indiebase/nest-knex';
import {
  CreateBucketCommand,
  DeleteBucketCommand,
  GetObjectCommand,
  InjectS3,
  S3Client,
} from '@indiebase/nest-s3';
import { TmplTables } from '@indiebase/server-shared';
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

export interface StorageSaveOptions {
  protocol: FastifyRequest['protocol'];
  namespace: PrimitiveProject['namespace'];
  hostname: FastifyRequest['hostname'];
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

  public async save(
    bucket: string,
    files: AsyncIterableIterator<MultipartFile>,
    options: StorageSaveOptions,
  ) {
    const { protocol, namespace, hostname } = options;
    const results: FileDTO[] = [];

    for await (const part of files) {
      const { filename, file } = part;
      const key = uuid.v4() + path.extname(filename);
      const originalname = encodeURIComponent(filename);
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
        searchParams.append('referenceId', namespace);

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
        `${TmplTables.buckets}.id`,
        `${TmplTables.buckets}.name`,
        `${TmplTables.buckets}.description`,
        `${TmplTables.buckets}.updatedAt`,
        `${TmplTables.buckets}.createdAt`,
      ])
      .from(TmplTables.buckets);
  }

  public async getFile(bucket: string, key: string) {
    const getCommand = new GetObjectCommand({
      Key: key,
      Bucket: bucket,
    });
    const res = await this.s3.send(getCommand);
    return res;
  }

  public async create(project: PrimitiveProject, name: string, description?: string) {
    // If the insertion throws an error, the following creation of bucket will not be executed.
    // Should execute before seaweedfs.
    await this.knex
      .withSchema(project.namespace)
      .insert({
        name: name,
        description,
      })
      .into(TmplTables.buckets);
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
    return this.knex(TmplTables.buckets)
      .withSchema(project.namespace)
      .update('deleted_at', this.knex.fn.now())
      .where({
        name,
      });
  }

  public async deleteBucket(name: string, project: PrimitiveProject) {
    await this.knex(TmplTables.buckets)
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
