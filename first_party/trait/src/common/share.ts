export type PaginationRequestSchema<T> = T & {
  pageIndex?: number;
  pageSize?: number;
};

export type ResponseDataType =
  | Array<any>
  | Record<string, any>
  | string
  | number
  | boolean;

export interface BaseResponseSchema<D extends ResponseDataType = any> {
  code: number;
  message?: string | string[];
  d?: D;
}

export interface PaginationResponseSchema<D> extends BaseResponseSchema<D> {
  total: number;
  pageIndex: number;
  pageSize: number;
}
