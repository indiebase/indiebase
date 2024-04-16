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
