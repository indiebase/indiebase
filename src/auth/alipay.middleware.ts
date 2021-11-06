import { Provide } from '@midwayjs/decorator';
import { ExpressPassportMiddleware } from '@deskbtm/midway-passport';

@Provide('alipay')
export class AlipayPassportMiddleware extends ExpressPassportMiddleware {
  strategy: string = 'alipay';

  // async setOptions() {
  //   return { failureRedirect: '/', failWithError: true };
  // }

  async auth(_ctx, ...d) {
    console.log(d);
    return d;
  }
}
