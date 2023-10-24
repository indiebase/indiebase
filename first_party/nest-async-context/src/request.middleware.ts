import { Injectable, NestMiddleware } from '@nestjs/common';
import { AsyncContext } from './async-context';

@Injectable()
export class RequestMiddleware<Request = any, Response = any>
  implements NestMiddleware<Request, Response>
{
  use(req: Request, res: Response, next: () => void) {
    AsyncContext.localStorage.run(new AsyncContext(req, res), next);
  }
}
