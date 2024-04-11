export enum ResultCode {
  TIMEOUT = -1,
  ERROR = 0,
  SUCCESS = 1,

  /**
   * Entity has existed
   */
  EENTEXIST = -2,
}

export enum ParamDirection {
  asc = 'asc',
  desc = 'desc',
}

export enum ParamSort {
  created = 'createTime',
  updated = 'updateTime',
  name = 'name',
}
