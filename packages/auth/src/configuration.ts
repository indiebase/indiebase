import { Config, Configuration, Inject } from '@midwayjs/decorator';
import * as express from '@midwayjs/express';
import {
  Context,
  ILifeCycle,
  IMidwayBaseApplication,
  IMidwayContainer,
} from '@midwayjs/core';
import * as nacos from '@letscollab/midway-nacos';
import { resolve } from 'path';
import {
  NacosConfigService,
  NacosNamingService,
} from '@letscollab/midway-nacos';
// import { NacosConfigService } from '@letscollab/midway-nacos';
// import { NacosConfigService } from '@letscollab/midway-nacos';
// console.log(nacos, jwt);
@Configuration({
  imports: [express, nacos],
  importConfigs: [resolve(__dirname, './config')],
  // conflictCheck: true,
})
export class AutoConfiguration implements ILifeCycle {
  @Inject()
  nacosConfigService: NacosConfigService;

  @Inject()
  nacosNamingService: NacosNamingService;

  @Config('')
  config;

  async onConfigLoad(
    container: IMidwayContainer,
    mainApp?: IMidwayBaseApplication<Context>,
  ): Promise<any> {
    const nacosService = await container.getAsync(NacosConfigService);

    console.log(await nacosService.getConfig('service-auth'));

    return;
  }
}
