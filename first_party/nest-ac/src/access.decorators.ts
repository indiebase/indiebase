import { AccessActions } from './actions';
import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { ACCESS_META } from './access.constants';

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
