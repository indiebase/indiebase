import { AsyncLocalStorage } from 'node:async_hooks';

export class RequestContext<IRequest = any, IResponse = any> {
  static cls = new AsyncLocalStorage<RequestContext>();

  static get currentContext() {
    return this.cls.getStore();
  }

  constructor(
    public readonly req: IRequest,
    public readonly res: IResponse,
  ) {}
}
