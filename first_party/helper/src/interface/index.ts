export * from './auth.interface';

export interface RpcResSchema<T> {
  code: number;
  message?: string | string[];
  d?: T;
}
