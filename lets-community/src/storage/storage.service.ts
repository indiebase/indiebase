import { MemoryStorageFile } from '@letscollab/nest-fastify-file';
// import {
//   CreateBucketCommand,
//   DeleteBucketCommand,
//   GetObjectCommand,
//   InjectS3,
//   PutObjectCommand,
//   S3,
// } from '@letscollab/nest-s3';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { nanoid } from 'nanoid';
import * as path from 'path';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BucketsEntity } from './buckets.entity';
import { did } from '@letscollab/dash';

interface SaveBucketOptions {
  signedUrl?: boolean;
  /**
   * Save to the /tmp/ directory, if object not be used, will delete automatically.
   */
  tmp?: boolean;
  bucket?: string;
}

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(BucketsEntity)
    private readonly bucketsRepo: Repository<BucketsEntity>,
    private readonly logger: Logger,
  ) {}

  public get repo() {
    return this.bucketsRepo;
  }

  public async save2Bucket(
    files: MemoryStorageFile[],
    preOptions?: SaveBucketOptions,
  ) {}

  public async getFile(bucket: string, fileId: string) {
    // const getCommand = new GetObjectCommand({
    //   Key: fileId,
    //   Bucket: bucket,
    // });
    // const [err, res] = await did(this.s3.send(getCommand));
  }

  public persistTmpFile(keys: string[]) {}

  public async createBucket(name: string, description: string) {

    

    // const createBucketCommand = new CreateBucketCommand({
    //   Bucket: name,
    // });
    // const [err] = await did(this.s3.send(createBucketCommand));
    // if (err) {
    //   this.logger.error(err);
    //   if (err.name === 'BucketAlreadyExists') {
    //     throw new ConflictException({
    //       message:
    //         'The requested bucket name is not available. The bucket name can not be an existing collection',
    //     });
    //   } else {
    //     throw new InternalServerErrorException({
    //       message: err.message,
    //     });
    //   }
    // }
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
