import { AccessAction } from './actions';
import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { ACCESS_META } from './casbin.constants';

export type IAccessOptions = {
  action: AccessAction;
  resource: string;
  possess?: (context: ExecutionContext) => Promise<boolean>;
};

export const UseAccess = (...access: IAccessOptions[]) =>
  SetMetadata(ACCESS_META, access);
