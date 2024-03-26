//@ts-nocheck

import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { mixin } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

import {
  UploadField,
  UploadFieldMapEntry,
} from '../multipart/handlers/file-fields';
import {
  handleMultipartFileFields,
  uploadFieldsToMap,
} from '../multipart/handlers/file-fields';
import { UploadOptions } from '../multipart/options';
import { transformUploadOptions } from '../multipart/options';
import { getMultipartRequest } from '../multipart/request';

export function FileFieldsInterceptor(
  uploadFields: UploadField[],
  options?: UploadOptions,
): Type<NestInterceptor> {
  class MixinInterceptor implements NestInterceptor {
    private readonly options: UploadOptions;

    private readonly fieldsMap: Map<string, UploadFieldMapEntry>;

    constructor() {
      this.options = transformUploadOptions(options);
      this.fieldsMap = uploadFieldsToMap(uploadFields);
    }

    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<any>> {
      const ctx = context.switchToHttp();
      const req = getMultipartRequest(ctx);

      const { body, files, remove } = await handleMultipartFileFields(
        req,
        this.fieldsMap,
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
