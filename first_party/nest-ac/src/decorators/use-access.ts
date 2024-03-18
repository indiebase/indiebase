import { ExecutionContext, SetMetadata } from '@nestjs/common';

import { ACCESS_META } from '../access.constants';

export type IAccessOptions = {
  [resource: string]: string | string[] | Record<string, string[]>;
};

export const UseAccess = (access: IAccessOptions) =>
  SetMetadata(ACCESS_META, access);
