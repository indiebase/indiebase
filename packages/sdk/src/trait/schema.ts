export interface PaginationRequestSchema {
  pageIndex?: number;
  pageSize: number;
}

export interface OkResponseSchema {
  /**
   * Business logic code.
   */
  code: number;
  /**
   * Optional message from server.
   */
  message?: string | string[];
}

export interface PaginationResponseSchema extends OkResponseSchema {
  /**
   * Total pages;
   */
  total: number;
  /**
   * Current pagination.
   */
  current: number;
  /**
   * Page count.
   */
  pageSize: number;
}

export interface ErrResponseSchema {
  /**
   * Business logic code.
   */
  code: number;
  /**
   * Http code.
   */
  statusCode: number;
  message?: string | string[];
  timestamp: Date;
  /**
   * Error response path.
   */
  path: string;
}
