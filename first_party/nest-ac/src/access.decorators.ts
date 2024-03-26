import { ExecutionContext } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';

import { ACCESS_META } from './access.constants';
import { AccessActions } from './actions';

export type IAccessOptions = {
  action?: AccessActions;
  resource?: string;
  possess?: (
    context: ExecutionContext,
    req?: any,
    user?: any,
  ) => Promise<boolean>;
};

export const UseAccess = (...access: IAccessOptions[]) =>
  SetMetadata(ACCESS_META, access);
