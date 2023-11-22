import { AsyncLocalStorage } from 'node:async_hooks';
import { IncomingMessage, ServerResponse } from 'node:http';

export class AsyncContext<IRequest = any, IResponse = any> {
  static localStorage = new AsyncLocalStorage<AsyncContext>();

  static current<
    Req extends IncomingMessage = any,
    Res extends ServerResponse = any,
  >(): AsyncContext<Req, Res> {
    return this.localStorage.getStore();
  }

  constructor(
    public readonly request: IRequest,
    public readonly response: IResponse,
  ) {}
}
