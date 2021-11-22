import { Provide } from '@midwayjs/decorator';
import { ExpressPassportMiddleware } from '@midwayjs/passport';

@Provide()
export class JwtPassportMiddleware extends ExpressPassportMiddleware {
  strategy: string = 'jwt';

  async setOptions() {
    return {
      presetProperty: 'demo',
    };
  }

  async auth(_ctx, _err, data) {
    // throw new Error('demo');
    return data;
  }
}
