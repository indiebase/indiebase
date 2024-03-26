import { Storage, StorageFile } from './storage';

export interface MemoryStorageFile extends StorageFile {
  buffer: Buffer;
}

export class MemoryStorage implements Storage<MemoryStorageFile> {
  public async handleFile(file: MemoryStorageFile) {
    const buffer = await file.toBuffer();
    file.buffer = buffer;
    return file;
  }

  public async removeFile(file: Partial<MemoryStorageFile>) {
    delete file.buffer;
  }
}
