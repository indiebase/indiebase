import { Configuration } from '@midwayjs/decorator';
import * as express from '@midwayjs/express';
import {
  Context,
  ILifeCycle,
  IMidwayBaseApplication,
  IMidwayContainer,
} from '@midwayjs/core';

import * as nacos from '@letscollab/midway-nacos';
import { resolve } from 'path';
import { NacosConfigService } from '@letscollab/midway-nacos';

@Configuration({
  imports: [express, nacos],
  importConfigs: [resolve(__dirname, './config')],
  conflictCheck: true,
})
export class AutoConfiguration implements ILifeCycle {
  async onConfigLoad(
    container: IMidwayContainer,
    mainApp?: IMidwayBaseApplication<Context>,
  ): Promise<any> {
    console.log(111, 2121);
    console.log(await container.getAsync(NacosConfigService));
  }
}
