export enum ResultCode {
  /**
   * Business logic timeout.
   */
  TIMEOUT = -1,
  /**
   * Business logic error.
   */
  ERROR = 0,
  /**
   * Business logic success.
   */
  SUCCESS = 1,

  /**
   * Entity has existed
   */
  EENTEXIST = -2,
}

/**
 * Sort direction.
 */
export enum ParamDirection {
  /**
   * Ascend.
   */
  asc = 'asc',
  /**
   * Descend.
   */
  desc = 'desc',
}

/**
 * Sort by property.
 */
export enum ParamSort {
  created = 'createTime',
  updated = 'updateTime',
  name = 'name',
}
