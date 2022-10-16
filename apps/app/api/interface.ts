export interface BaseResSchema<D = any> {
  code: number;
  message?: string | string[];
  d: D;
}
