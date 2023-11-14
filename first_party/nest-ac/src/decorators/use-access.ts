import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { AccessAction } from '../actions';
import { ACCESS_META } from '../access.constants';

export type IAccessOptions = {
  action?: AccessAction;
  resource?: string;
  possess?: (
    context: ExecutionContext,
    req?: any,
    user?: any,
  ) => Promise<boolean>;
};

export const UseAccess = (...access: IAccessOptions[]) =>
  SetMetadata(ACCESS_META, access);
