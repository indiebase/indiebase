/**
 * Copyright (c) 2022 Nawbc
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */


import { Config, Init, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import {
  ClientOptions as NacosConfigClientOptions,
  NacosConfigClient,
} from 'nacos';
import stripJsonComments, { Options } from 'strip-json-comments';

@Provide()
@Scope(ScopeEnum.Singleton)
export class NacosConfigService {
  @Config('nacosConfig')
  options: NacosConfigClientOptions;

  #client: NacosConfigClient;

  @Init()
  initService() {
    this.#client = new NacosConfigClient(this.options);
  }

  public get client() {
    return this.#client;
  }

  #jsonParser(data: string, options?: Options) {
    return JSON.parse(stripJsonComments(data, options));
  }
}
