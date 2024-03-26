import { MultipartFile } from '@fastify/multipart';
import { FastifyRequest } from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';
import { createWriteStream } from 'fs';
import { mkdir, unlink } from 'fs/promises';
import { IncomingMessage, Server } from 'http';
import { tmpdir } from 'os';
import { join } from 'path';

import { getUniqueFilename, pathExists } from '../fs';
import { pump } from '../stream';
import { Storage, StorageFile } from './storage';

export interface DiskStorageFile extends StorageFile {
  dest: string;
  path: string;
}

type DiskStorageOptionHandler =
  | ((file: MultipartFile, req: FastifyRequest) => Promise<string> | string)
  | string;

export interface DiskStorageOptions {
  dest?: DiskStorageOptionHandler;
  filename?: DiskStorageOptionHandler;
  removeAfter?: boolean;
}

const excecuteStorageHandler = (
  file: MultipartFile,
  req: FastifyRequest,
  obj?: DiskStorageOptionHandler,
) => {
  if (typeof obj === 'function') {
    return obj(file, req);
  }

  if (obj != null) return obj;

  return null;
};

const ENV_TESTS_STORAGE_TMP_PATH = process.env.__TESTS_TMP_PATH__;
export class DiskStorage
  implements Storage<DiskStorageFile, DiskStorageOptions>
{
  public readonly options?: DiskStorageOptions;

  constructor(options?: DiskStorageOptions) {
    this.options = options;

    if (ENV_TESTS_STORAGE_TMP_PATH != null) {
      this.options = { ...this.options, dest: ENV_TESTS_STORAGE_TMP_PATH };
    }
  }

  public async handleFile(
    file: MultipartFile,
    req: FastifyRequest<RouteGenericInterface, Server, IncomingMessage>,
  ) {
    const filename = await this.getFilename(file, req, this.options?.filename);
    const dest = await this.getFileDestination(file, req, this.options?.dest);

    if (!(await pathExists(dest))) {
      await mkdir(dest, { recursive: true });
    }

    const path = join(dest, filename);
    const stream = createWriteStream(path);

    await pump(file.file, stream);

    return {
      ...file,
      size: stream.bytesWritten,
      dest,
      path,
    };
  }

  public async removeFile(file: DiskStorageFile, force?: boolean) {
    if (!this.options?.removeAfter && !force) return;

    await unlink(file.path);
  }

  protected async getFilename(
    file: MultipartFile,
    req: FastifyRequest,
    obj?: DiskStorageOptionHandler,
  ): Promise<string> {
    return (
      excecuteStorageHandler(file, req, obj) ?? getUniqueFilename(file.filename)
    );
  }

  protected async getFileDestination(
    file: MultipartFile,
    req: FastifyRequest,
    obj?: DiskStorageOptionHandler,
  ): Promise<string> {
    return excecuteStorageHandler(file, req, obj) ?? tmpdir();
  }
}
