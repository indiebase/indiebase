export type PaginationReqSchema<T> = T & {
  pageIndex?: number;
  pageSize?: number;
};

export interface BaseResSchema<D = any> {
  code: number;
  message?: string | string[];
  d: D;
}

export interface PaginationResSchema<D> extends BaseResSchema<D> {
  total: number;
  pageIndex: number;
  pageSize: number;
}
