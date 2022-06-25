import { AccessAction } from './actions';
import { SetMetadata } from '@nestjs/common';
import { ACCESS_META } from './casbin.constants';

export type IAccessOptions = {
  action: AccessAction;
  resource: string;
};

export const UseAccess = (...access: IAccessOptions[]) =>
  SetMetadata(ACCESS_META, access);
