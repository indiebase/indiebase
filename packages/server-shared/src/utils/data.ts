import {
  type ErrResponseSchema,
  type OkedResponseSchema,
  type PaginatedResponseSchema,
} from '../dto/schema.dto';

export function data<T = any>(
  content: (
    | OkedResponseSchema
    | PaginatedResponseSchema
    | ErrResponseSchema
    | T
  ) & { body?: any },
) {
  return content;
}

export function paginatedData(value: any): {
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
