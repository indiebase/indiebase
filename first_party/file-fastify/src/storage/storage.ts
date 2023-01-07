import { FastifyRequest } from 'fastify';
import { MultipartFile } from '@fastify/multipart';

export type StorageFile = MultipartFile;

export interface Storage<T extends StorageFile = StorageFile, K = any> {
  handleFile: (file: MultipartFile, req: FastifyRequest) => Promise<T>;
  removeFile: (file: T, force?: boolean) => Promise<void> | void;
  options?: K;
}
