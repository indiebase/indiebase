export interface PaginationReqSchema {
  current?: number;
  pageSize: number;
}

export interface BaseResSchema<D = any> {
  code: number;
  message?: string | string[];
  d: D;
}

export interface PaginationResSchema<D> extends BaseResSchema<D> {
  total: number;
  current: number;
  pageSize: number;
}
