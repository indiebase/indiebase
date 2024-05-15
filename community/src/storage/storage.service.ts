import { Readable } from 'node:stream';

import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { did } from '@deskbtm/gadgets';
import { MemoryStorageFile } from '@indiebase/nest-fastify-file';
import { InjectKnex } from '@indiebase/nest-knex';
import {
  CreateBucketCommand,
  GetObjectCommand,
  InjectS3,
  PutObjectCommand,
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

  private uploadFile(Key: string, Body: Readable): Upload {
    const res = new Upload({
      client: this.s3,
      params: {
        Bucket: '<your s3 bucket name here>',
        Key,
        Body,
      },
    });
    return res;
  }

  public async save2Bucket(
    bucket: string,
    files: MemoryStorageFile[],
    uploadOptions?: UploadBucketOptions,
  ) {
    return Promise.all(
      files.map(async (file) => {
        // const parallelUploads3 = new Upload({
        //   client: this.s3,
        //   params: {
        //     Bucket: bucket,
        //     Key: file.filename,
        //     Body: file.file,
        //   },
        // });
        // parallelUploads3.on('httpUploadProgress', (progress) => {
        //   console.log(progress);
        // });
        // await parallelUploads3.done();
        return this.s3.send(
          new PutObjectCommand({
            Body: file.buffer,
            Bucket: bucket,
            Key: file.filename,
          }),
        );
      }),
    );
  }

  public async getObject(bucket: string, key: string) {
    const getCommand = new GetObjectCommand({
      Key: key,
      Bucket: bucket,
    });
    const [err, res] = await did(this.s3.send(getCommand));
    return res;
  }

  public persistTmpFile(keys: string[]) {}

  public async createBucket(
    project: PrimitiveProject,
    name: string,
    description: string,
  ) {
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

    return this.knex
      .withSchema(project.namespace)
      .insert({
        name: name,
        description,
      })
      .into(TmplMetaTables.buckets);

    // const entity = this.bucketsRepo.create({ name, description });
    // await this.bucketsRepo.save(entity);
  }

  public async deleteBucket(name: string) {
    // const deleteBucketCommand = new DeleteBucketCommand({
    //   Bucket: name,
    // });
    // const [err] = await did(this.s3.send(deleteBucketCommand));
    // if (err) {
    //   this.logger.error(err);
    //   switch (err.name) {
    //     case 'NoSuchBucket':
    //       throw new NotFoundException({
    //         message: err.message,
    //       });
    //     default:
    //       throw new InternalServerErrorException({
    //         message: err.message,
    //       });
    //   }
    // }
    // await this.bucketsRepo.delete({ name });
  }
}
