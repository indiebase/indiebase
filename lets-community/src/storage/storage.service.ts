import { MemoryStorageFile } from '@letscollab/nest-fastify-file';
import {
  CreateBucketCommand,
  DeleteBucketCommand,
  GetObjectCommand,
  InjectS3,
  PutObjectCommand,
  S3,
} from '@letscollab/nest-s3';
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
    @InjectS3()
    private readonly s3: S3,
    @InjectRepository(BucketsEntity)
    private readonly bucketsRepo: Repository<BucketsEntity>,
    private readonly logger: Logger,
  ) {}

  public get repo() {
    return this.bucketsRepo;
  }

  public async save2Bucket(
    files: MemoryStorageFile[],
    options: SaveBucketOptions = {
      signedUrl: false,
      tmp: false,
      bucket: 'letscollab',
    },
  ) {
    const d = [];

    console.log(files);

    for (const file of files) {
      const p = path.parse(file.filename);
      const Key = options.tmp ? 'tmp/' : '' + nanoid(32) + p.ext;

      const putCommand = new PutObjectCommand({
        Key,
        Body: file.buffer,
        Bucket: options.bucket,
      });
      await this.s3.send(putCommand);
      let url;
      const getCommand = new GetObjectCommand({
        Key,
        Bucket: options.bucket,
      });
      const [err, result] = await did(this.s3.send(getCommand));

      if (options.signedUrl) {
        const getCommand = new GetObjectCommand({
          Key,
          Bucket: options.bucket,
        });
        console.log(getCommand);
        url = await getSignedUrl(this.s3, getCommand);
      } else {
        const endpoint = await this.s3.config.endpoint();
        url = `${endpoint.protocol}//${endpoint.hostname}:${endpoint.port}${endpoint.path}letscollab/${Key}`;
      }

      d.push(url);
    }

    return d.length > 1 ? d : d?.[0];
  }

  public persistTmpFile(keys: string[]) {}

  public async createBucket(name: string, description: string) {
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

    const entity = this.bucketsRepo.create({ name, description });
    await this.bucketsRepo.save(entity);
  }

  public async deleteBucket(name: string) {
    const deleteBucketCommand = new DeleteBucketCommand({
      Bucket: name,
    });

    const [err] = await did(this.s3.send(deleteBucketCommand));

    if (err) {
      this.logger.error(err);
      switch (err.name) {
        case 'NoSuchBucket':
          throw new NotFoundException({
            message: err.message,
          });

        default:
          throw new InternalServerErrorException({
            message: err.message,
          });
      }
    }

    await this.bucketsRepo.delete({ name });
  }
}
