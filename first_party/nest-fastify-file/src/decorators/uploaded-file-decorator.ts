import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

import { getMultipartRequest } from '../multipart/request';
import type { StorageFile } from '../storage/storage';

export const UploadedFile = createParamDecorator(
  async (
    data: any,
    ctx: ExecutionContext,
  ): Promise<StorageFile | undefined> => {
    const req = getMultipartRequest(ctx.switchToHttp());

    return req?.storageFile;
  },
);
