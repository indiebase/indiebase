import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
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
import { TmplMetaTables } from '@indiebase/server-shared';
import { PrimitiveProject } from '@indiebase/trait';
// import {
//   CreateBucketCommand,
//   DeleteBucketCommand,
//   GetObjectCommand,
//   InjectS3,
//   PutObjectCommand,
//   S3,
// } from '@indiebase/nest-s3';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import path from 'path';
import * as uuid from 'uuid';

interface UploadBucketOptions {
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

  public async save(
    bucket: string,
    files: AsyncIterableIterator<MultipartFile>,
    uploadOptions?: UploadBucketOptions,
  ) {
    const result = [];

    for await (const part of files) {
      const { filename, file } = part;
      const key = uuid.v4() + path.extname(filename);
      try {
        const parallelUploads3 = new Upload({
          client: this.s3,
          params: {
            Bucket: bucket,
            Key: key,
            Body: file,
            Metadata: {
              originalname: filename,
            },
          },
        });
        const s3Res = await parallelUploads3.done();

        console.log(s3Res.Location);

        // result.push();

        // return Array.prototype.map.call(s3Res, (r) => {});
      } catch (error) {
        this.logger.error(error);
        throw new InternalServerErrorException();
      }
    }
  }

  public async getFile(bucket: string, key: string) {
    const getCommand = new GetObjectCommand({
      Key: key,
      Bucket: bucket,
    });
    const [err, res] = await did(this.s3.send(getCommand));
    console.log(res?.Metadata);
    const url = await getSignedUrl(this.s3, getCommand, { expiresIn: 3600 });
    console.log(url);
    // return res;
    return url;
  }

  public persistTmpFile(keys: string[]) {}

  public async createBucket(
    project: PrimitiveProject,
    name: string,
    description: string,
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
