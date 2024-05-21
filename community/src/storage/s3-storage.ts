import fs from 'node:fs';

import { pump, Storage, StorageFile } from '@indiebase/nest-fastify-file';

export class S3Storage implements Storage<StorageFile> {
  public async handleFile(file: StorageFile) {
    await pump(file.file, fs.createWriteStream(`./${file.filename}`));
    return file;
  }

  public async removeFile() {}
}
