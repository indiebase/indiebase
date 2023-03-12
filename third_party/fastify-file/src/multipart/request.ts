import { BadRequestException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { FastifyRequest } from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';
import { IncomingMessage, Server } from 'http';

import { UploadOptions } from './options';
import { StorageFile } from '../storage';
import { MultipartFile } from '@fastify/multipart';
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
