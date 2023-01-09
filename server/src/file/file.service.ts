import { MemoryStorageFile } from '@letscollab-nest/file-fastify';
import {
  GetObjectCommand,
  InjectS3,
  PutObjectCommand,
  S3,
} from '@letscollab-nest/aws-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';
import * as path from 'path';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class FileService {
  constructor(
    @InjectS3() private readonly s3: S3,
    private readonly configSrv: ConfigService,
  ) {}

  public async save2Bucket(files: MemoryStorageFile[]) {
    const d = [];

    for (const file of files) {
      const p = path.parse(file.filename);
      const Key = nanoid(32) + p.ext;
      const putCommand = new PutObjectCommand({
        Key,
        Body: file.buffer,
        Bucket: 'letscollab',
      });
      const getCommand = new GetObjectCommand({
        Key,
        Bucket: 'letscollab',
      });
      await this.s3.send(putCommand);
      const url = await getSignedUrl(this.s3, getCommand);

      d.push(url);
    }

    return d;
  }
}
