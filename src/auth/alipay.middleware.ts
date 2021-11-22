import { Provide } from '@midwayjs/decorator';
import { ExpressPassportMiddleware } from '@midwayjs/passport';

@Provide('alipay')
export class AlipayPassportMiddleware extends ExpressPassportMiddleware {
  strategy: string = 'alipay';

  // async setOptions() {
  //   return { failureRedirect: '/', failWithError: true };
  // }

  async auth(_ctx, ...d) {
    return d;
  }
}
