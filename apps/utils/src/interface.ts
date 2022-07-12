import { AccountStatus, SignupType } from './constant';
import { OrgSelectProps } from './components';

export interface PaginationReq {
  current?: number;
  pageSize: number;
}

export interface BaseResSchema<D = any> {
  code: number;
  message?: string | string[];
  d: D;
}

export interface PaginationResSchema extends BaseResSchema {
  total: number;
  current: number;
  pageSize: number;
}
