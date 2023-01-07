import { MemoryStorageFile } from '@letscollab-nest/file-fastify';
import { InjectS3, PutObjectCommand, S3 } from '@letscollab-nest/aws-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';
import * as path from 'path';

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
      const result = await this.s3.send(
        new PutObjectCommand({
          Key,
          Body: file.buffer,
          Bucket: 'letscollab',
        }),
      );
      console.log(result);

      const getObjectResult = await this.s3.getObject({
        Bucket: 'community',
        Key,
      });

      console.log(getObjectResult);
    }
  }
}
