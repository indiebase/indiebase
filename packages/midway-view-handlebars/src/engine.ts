import {
  Provide,
  Scope,
  ScopeEnum,
  App,
  Config,
  Init,
  ALL,
} from '@midwayjs/decorator';
import * as handlebars from 'handlebars';

@Provide()
@Scope(ScopeEnum.Singleton)
export class HandlebarsEnvironment {
  @App()
  private app;

  @Config(ALL)
  protected globalConfig;

  render(name, options, cb) {}
}
