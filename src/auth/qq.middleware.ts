import { Provide } from '@midwayjs/decorator';
import { ExpressPassportMiddleware } from '@deskbtm/midway-passport';

@Provide('qq')
export class QQPassportMiddleware extends ExpressPassportMiddleware {
  strategy: string = 'qq';

  async auth(_ctx, ...d) {
    console.log(d);
    return d;
  }
}
