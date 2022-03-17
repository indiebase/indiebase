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
import stripJsonComments, {
  StripJsonCommentsOptions,
} from './strip-json-comments';

@Provide()
@Scope(ScopeEnum.Singleton)
export class NacosConfigService {
  @Config('nacosConfig')
  options: NacosConfigClientOptions;

  #client: NacosConfigClient;

  @Init()
  initService() {
    console.log('==========================');
    this.#client = new NacosConfigClient(this.options);
  }

  public get client() {
    return this.client;
  }

  #jsonParser(data: string, options?: StripJsonCommentsOptions) {
    return JSON.parse(stripJsonComments(data, options));
  }
}
