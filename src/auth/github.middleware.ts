import { Provide } from '@midwayjs/decorator';
import { ExpressPassportMiddleware } from '@deskbtm/midway-passport';

@Provide('github')
export class GithubPassportMiddleware extends ExpressPassportMiddleware {
  strategy: string = 'github';

  async setOptions() {
    return { failureRedirect: '/', failWithError: true };
  }

  async auth(_ctx, ...d) {
    return d;
  }
}
