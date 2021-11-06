import { Provide } from '@midwayjs/decorator';
import { ExpressPassportMiddleware } from '@deskbtm/midway-passport';

@Provide()
export class JwtPassportMiddleware extends ExpressPassportMiddleware {
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
