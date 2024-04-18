import {
  type ErrResponseSchema,
  type OkResponseSchema,
  type PaginationResponseSchema,
} from '../dto/schema.dto';

export function data<T = any>(
  content: OkResponseSchema | PaginationResponseSchema | ErrResponseSchema | T,
) {
  return content;
}

export function paginationData(value: any): {
  data: any;
  total: number;
  lastPage: number;
  prevPage: number;
  nextPage: number;
  pageSize: number;
  pageIndex;
} {
  const { data, pagination = {} } = value;

  const { total, lastPage, prevPage, nextPage, pageSize, pageIndex } =
    pagination;

  return {
    data,
    total,
    lastPage,
    prevPage,
    nextPage,
    pageSize,
    pageIndex,
  };
}
