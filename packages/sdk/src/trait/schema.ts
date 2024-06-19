export interface PaginatedRequestSchema {
  pageIndex?: number;
  pageSize: number;
}

export interface OkedResponseSchema {
  /**
   * Business logic code.
   */
  code: number;
  /**
   * Optional message from server.
   */
  message?: string | string[];
}

export interface PaginatedResponseSchema extends OkedResponseSchema {
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
