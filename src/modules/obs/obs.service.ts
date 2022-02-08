import { InjectS3, S3 } from '@/modules';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';
import * as path from 'path';

@Injectable()
export class ObsService {
  constructor(
    @InjectS3() private readonly s3: S3,
    private readonly configSrv: ConfigService,
  ) {}

  public async upload(file: Express.Multer.File) {
    const p = path.parse(file.originalname);
    return new Promise((resolve, reject) => {
      this.s3.upload(
        {
          Key: p.name + '-' + nanoid() + p.ext,
          Body: file.buffer,
          Bucket: this.configSrv.get('s3.bucket'),
        },
        (err, data) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          resolve(data);
        },
      );
    });
  }
}
