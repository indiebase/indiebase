import { Provide } from '@midwayjs/decorator';
import { ExpressPassportMiddleware } from '@deskbtm/midway-passport/src/express';

@Provide()
export class LocalPassportMiddleware extends ExpressPassportMiddleware {
  public strategy: string = 'local';

  public onError(...args: any[]): void {}

  async auth(err, data) {
    return data;
  }
}
