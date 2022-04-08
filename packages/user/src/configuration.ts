import { Configuration, Inject } from '@midwayjs/decorator';
import * as express from '@midwayjs/express';
import {
  Context,
  ILifeCycle,
  IMidwayBaseApplication,
  IMidwayContainer,
} from '@midwayjs/core';
import * as nacos from '@letscollab/midway-nacos';
import * as casbin from '@letscollab/midway-casbin';
import { resolve } from 'path';
import { NacosConfig, NacosNamingService } from '@letscollab/midway-nacos';
import * as rabbitmq from '@midwayjs/rabbitmq';

@Configuration({
  imports: [express, nacos, casbin, rabbitmq],
  importConfigs: [resolve(__dirname, './config')],
})
export class AutoConfiguration implements ILifeCycle {
  @Inject()
  nacosNamingService: NacosNamingService;

  @NacosConfig('service-user.json')
  userConfigs;

  async onReady(
    container: IMidwayContainer,
    mainApp?: IMidwayBaseApplication<Context>,
  ): Promise<void> {}

  async onConfigLoad(container: IMidwayContainer): Promise<any> {
    return this.userConfigs;
  }
}
