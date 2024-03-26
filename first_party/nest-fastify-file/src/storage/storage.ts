import { MultipartFile } from '@fastify/multipart';
import { FastifyRequest } from 'fastify';

export type StorageFile = MultipartFile;

export interface Storage<T extends StorageFile = StorageFile, K = any> {
  handleFile: (file: MultipartFile, req: FastifyRequest) => Promise<T>;
  removeFile: (file: T, force?: boolean) => Promise<void> | void;
  options?: K;
}
