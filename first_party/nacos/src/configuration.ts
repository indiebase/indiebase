/**
 * Copyright 2022 WangHan
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NacosConfigService } from './nacos.config';
import {
  ILifeCycle,
  MidwayDecoratorService,
  MidwayLoggerService,
} from '@midwayjs/core';
import { Configuration, Init, Inject } from '@midwayjs/decorator';
import { NacosNamingService } from './nacos.naming';
import { NACOS_CONFIG_KEY } from './nacos.decorator';

@Configuration({
  namespace: 'nacos',
  importConfigs: [
    {
      default: {
        nacosConfig: {},
        nacosNaming: {},
        midwayLogger: {
          clients: {
            nacosNamingLogger: {
              fileLogName: 'nacos-naming.log',
            },
          },
        },
      },
    },
  ],
})
export class NacosConfiguration implements ILifeCycle {
  @Inject()
  loggerService: MidwayLoggerService;

  @Inject()
  nacosConfigService: NacosConfigService;

  @Inject()
  nacosNamingService: NacosNamingService;

  @Inject()
  decoratorService: MidwayDecoratorService;

  @Init()
  async init(): Promise<void> {
    this.decoratorService.registerPropertyHandler(
      NACOS_CONFIG_KEY,
      async (_propertyName, meta) => {
        const configs = meta.parser
          ? await this.nacosConfigService
              .setDataParser(meta.parser)
              .getConfig(meta.config)
          : await this.nacosConfigService.getConfig(meta.config);

        return meta.key
          ? meta.key.split('.').reduce((p, n) => p[n], configs)
          : configs;
      },
    );
  }

  async onStop(): Promise<void> {
    await this.nacosConfigService?.close();
    await this.nacosNamingService?.close();
  }
}
