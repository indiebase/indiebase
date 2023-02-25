import { MemoryStorageFile } from '@letscollab-nest/file-fastify';
import {
  GetObjectCommand,
  InjectS3,
  PutObjectCommand,
  S3,
} from '@letscollab-nest/aws-s3';
import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import * as path from 'path';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

interface SaveBucketOptions {
  signedUrl?: boolean;
  /**
   * Save to the /tmp/ directory, if object not be used, will delete automatically.
   */
  tmp?: boolean;
  bucket?: string;
}

@Injectable()
export class FileService {
  constructor(@InjectS3() private readonly s3: S3) {}

  public async save2Bucket(
    files: MemoryStorageFile[],
    options: SaveBucketOptions = {
      signedUrl: false,
      tmp: false,
      bucket: 'letscollab-community',
    },
  ) {
    const d = [];

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
      if (options.signedUrl) {
        const getCommand = new GetObjectCommand({
          Key,
          Bucket: options.bucket,
        });
        url = await getSignedUrl(this.s3, getCommand);
      } else {
        const endpoint = await this.s3.config.endpoint();
        url = `${endpoint.protocol}//${endpoint.hostname}:${endpoint.port}${endpoint.path}letscollab/${Key}`;
      }

      d.push(url);
    }

    return d.length > 1 ? d : d?.[0];
  }

  public persistTmpFiles(keys: string[]) {}
}
