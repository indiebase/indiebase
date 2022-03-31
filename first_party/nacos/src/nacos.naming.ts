import {
  App,
  Config,
  Init,
  Provide,
  Scope,
  ScopeEnum,
} from '@midwayjs/decorator';
import { NacosNamingClient, NacosNamingClientOptions } from './nacos.interface';
import { NacosLogger } from './nacos.logger';
import * as nacos from 'nacos';
import { IMidwayApplication } from '@midwayjs/core';

@Provide()
@Scope(ScopeEnum.Singleton)
export class NacosNamingService {
  @Config('nacosConfig')
  options: NacosNamingClientOptions;

  @App()
  app: IMidwayApplication;

  #client!: NacosNamingClient;

  #logger!: NacosLogger;

  @Init()
  initService() {
    console.log(this.#logger);
    // this.app

    this.#logger = new NacosLogger();
    this.#client = new (nacos as any).NacosNamingClient({
      ...this.options,
      logger: this.#logger,
    });
  }
}
