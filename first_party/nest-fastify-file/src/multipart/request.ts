import type { MultipartFile } from '@fastify/multipart';
import { BadRequestException } from '@nestjs/common';
import type { HttpArgumentsHost } from '@nestjs/common/interfaces';
import type { FastifyRequest } from 'fastify';
import type { RouteGenericInterface } from 'fastify/types/route';
import type { IncomingMessage, Server } from 'http';

import type { StorageFile } from '../storage';
import type { UploadOptions } from './options';
// import { MultipartFile } from './file';

export type FastifyMultipartRequest = FastifyRequest<
  RouteGenericInterface,
  Server,
  IncomingMessage
> & {
  storageFile?: StorageFile;
  storageFiles?: StorageFile[] | Record<string, StorageFile[]>;
};

export type MultipartIterator = AsyncIterableIterator<MultipartFile>;

export const getMultipartRequest = (ctx: HttpArgumentsHost) => {
  const req = ctx.getRequest<FastifyMultipartRequest>();

  if (!req.isMultipart()) {
    throw new BadRequestException('Not a multipart request');
  }

  return req;
};

export const getParts = (req: FastifyRequest, options: UploadOptions) => {
  return req.parts(options) as MultipartIterator;
};
