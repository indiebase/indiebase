export interface ClzType<T = any> extends Function {
  new (...args: any[]): T;
}
