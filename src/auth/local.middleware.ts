import { Provide } from '@midwayjs/decorator';
import { WebPassportMiddleware } from '@deskbtm/midway-passport';

@Provide()
export class LocalPassportMiddleware extends WebPassportMiddleware {
  public strategy: string = 'local';

  public async auth(ctx, err, data) {
    return data;
  }
}
