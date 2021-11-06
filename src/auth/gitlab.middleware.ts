import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { ExpressPassportMiddleware } from '@deskbtm/midway-passport';

@Provide('gitlab')
@Scope(ScopeEnum.Singleton)
export class GitlabPassportMiddleware extends ExpressPassportMiddleware {
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
@Scope(ScopeEnum.Singleton)
export class Gitlab2PassportMiddleware extends ExpressPassportMiddleware {
  strategy: string = 'gitlab';
}
