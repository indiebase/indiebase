import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { ExpressPassportMiddleware } from '@deskbtm/midway-passport';
import { Context } from '@midwayjs/express';

@Provide('gitlab')
export class GitlabPassportMiddleware extends ExpressPassportMiddleware {
  strategy: string = 'gitlab';

  async setOptions() {
    return { failureRedirect: '/', failWithError: true };
  }

  async auth(...d) {
    return d;
  }
}

@Provide('gitlab2')
export class Gitlab2PassportMiddleware extends ExpressPassportMiddleware {
  strategy: string = 'gitlab';

  public async auth(ctx: Context, ...args: any[]) {
    return {};
  }
}
