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

import { handleMultipartSingleFile } from '../multipart/handlers/single-file';
import type { UploadOptions } from '../multipart/options';
import { transformUploadOptions } from '../multipart/options';
import { getMultipartRequest } from '../multipart/request';

export function FileInterceptor(
  fieldname: string,
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

      const { file, body, remove } = await handleMultipartSingleFile(
        req,
        fieldname,
        this.options,
      );

      req.body = body;
      req.storageFile = file;

      return next.handle().pipe(tap(remove));
    }
  }

  const Interceptor = mixin(MixinInterceptor);

  return Interceptor;
}
