import { AsyncLocalStorage } from 'node:async_hooks';

export class AsyncContext<IRequest = any, IResponse = any> {
  static localStorage = new AsyncLocalStorage<AsyncContext>();

  static current<Req = any, Res = any>(): AsyncContext<Req, Res> {
    return this.localStorage.getStore();
  }

  constructor(
    public readonly request: IRequest,
    public readonly response: IResponse,
  ) {}
}
