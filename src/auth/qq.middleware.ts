import { Provide } from '@midwayjs/decorator';
import { ExpressPassportMiddleware } from '@midwayjs/passport';

@Provide('qq')
export class QQPassportMiddleware extends ExpressPassportMiddleware {
  strategy: string = 'qq';

  async auth(_ctx, ...d) {
    return d;
  }
}
