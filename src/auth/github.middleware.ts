import { Provide } from '@midwayjs/decorator';
import { WebPassportMiddleware } from '@deskbtm/midway-passport';

@Provide('github')
export class GithubPassportMiddleware extends WebPassportMiddleware {
  strategy: string = 'github';

  async setOptions() {
    return { failureRedirect: '/', failWithError: true };
  }

  async auth(_ctx, ...d) {
    return d;
  }
}
