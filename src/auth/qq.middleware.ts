import { Provide } from '@midwayjs/decorator';
import { WebPassportMiddleware } from '@deskbtm/midway-passport';

@Provide('qq')
export class QQPassportMiddleware extends WebPassportMiddleware {
  strategy: string = 'qq';

  async auth(_ctx, ...d) {
    return d;
  }
}
