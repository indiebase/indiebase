import { Provide } from '@midwayjs/decorator';
import { WebPassportMiddleware } from '@deskbtm/midway-passport';

@Provide()
export class JwtPassportMiddleware extends WebPassportMiddleware {
  strategy: string = 'jwt';

  async setOptions() {
    return {
      presetProperty: 'demo',
    };
  }

  async auth(_ctx, _err, data) {
    return data;
  }
}
