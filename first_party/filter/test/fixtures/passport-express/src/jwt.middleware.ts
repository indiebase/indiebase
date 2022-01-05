import { ExpressPassportMiddleware } from '../../../../../passport/src';
import { Provide } from '@midwayjs/decorator';

@Provide()
export class JwtPassportMiddleware extends ExpressPassportMiddleware {
  public strategy: string = 'jwt';

  public async auth(_ctx, _err, data) {
    return data;
  }
}