//@ts-nocheck

import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Type} from '@nestjs/common';
import {
  mixin
} from '@nestjs/common';
import type { Observable} from 'rxjs';
import { tap } from 'rxjs';

import { handleMultipartMultipleFiles } from '../multipart/handlers/multiple-files';
import type { UploadOptions } from '../multipart/options';
import { transformUploadOptions } from '../multipart/options';
import { getMultipartRequest } from '../multipart/request';

export function FilesInterceptor(
  fieldname: string,
  maxCount = 1,
  options?: UploadOptions,
): Type<NestInterceptor> {
  class MixinInterceptor implements NestInterceptor {
    private readonly options: UploadOptions;

    constructor() {
      this.options = transformUploadOptions(options);
    }

    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<any>> {
      const ctx = context.switchToHttp();
      const req = getMultipartRequest(ctx);

      const { body, files, remove } = await handleMultipartMultipleFiles(
        req,
        fieldname,
        maxCount,
        this.options,
      );

      req.body = body;
      req.storageFiles = files;

      return next.handle().pipe(tap(remove));
    }
  }

  const Interceptor = mixin(MixinInterceptor);

  return Interceptor;
}
