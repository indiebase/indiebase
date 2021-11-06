import { Provide } from '@midwayjs/decorator';
import { WebPassportMiddleware } from '@deskbtm/midway-passport';

@Provide('alipay')
export class AlipayPassportMiddleware extends WebPassportMiddleware {
  strategy: string = 'alipay';

  // async setOptions() {
  //   return { failureRedirect: '/', failWithError: true };
  // }

  async auth(_ctx, ...d) {
    console.log(d);
    return d;
  }
}
