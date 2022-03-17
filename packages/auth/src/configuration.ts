import { Configuration } from '@midwayjs/decorator';
import * as express from '@midwayjs/express';
import {
  Context,
  ILifeCycle,
  IMidwayBaseApplication,
  IMidwayContainer,
} from '@midwayjs/core';
import * as jwt from '@midwayjs/jwt';
import * as nacos from '@letscollab/midway-nacos';
import { resolve } from 'path';
import { NacosConfigService } from '@letscollab/midway-nacos';
// import { NacosConfigService } from '@letscollab/midway-nacos';
console.log(nacos, jwt);
@Configuration({
  imports: [express],
  importConfigs: [resolve(__dirname, './config')],
  // conflictCheck: true,
})
export class AutoConfiguration implements ILifeCycle {
  async onReady(
    container: IMidwayContainer,
    mainApp?: IMidwayBaseApplication<Context>,
  ): Promise<void> {
    // console.log(await container.getAsync(NacosConfigService));
  }
}
