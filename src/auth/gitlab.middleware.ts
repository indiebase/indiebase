import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { WebPassportMiddleware } from '@deskbtm/midway-passport';
import { Context } from '@midwayjs/koa';

@Provide('gitlab')
export class GitlabPassportMiddleware extends WebPassportMiddleware {
  strategy: string = 'gitlab';

  async setOptions() {
    return { failureRedirect: '/', failWithError: true };
  }

  async auth(...d) {
    console.log(d, '=================');
    return d;
  }
}

@Provide('gitlab2')
export class Gitlab2PassportMiddleware extends WebPassportMiddleware {
  strategy: string = 'gitlab';

  public auth(ctx: Context, ...args: any[]) {
    throw new Error('Method not implemented.');
  }
}
