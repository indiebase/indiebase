import TypeOrmAdapter from 'typeorm-adapter';
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
import { CasbinService } from '@letscollab/midway-casbin';
import * as rabbitmq from '@midwayjs/rabbitmq';

@Configuration({
  imports: [express, rabbitmq, nacos, casbin],
  importConfigs: [resolve(__dirname, './config')],
})
export class AutoConfiguration implements ILifeCycle {
  @Inject()
  nacosNamingService: NacosNamingService;

  @NacosConfig('service-auth.json')
  authConfigs;

  async onReady(
    container: IMidwayContainer,
    mainApp?: IMidwayBaseApplication<Context>,
  ): Promise<void> {
    const casbin = await container.getAsync(CasbinService);
  }

  async onConfigLoad(container: IMidwayContainer): Promise<any> {
    const remoteConfigs = {
      ...(await this.authConfigs),
      casbin: {
        model: resolve(__dirname, './model/base.conf'),
        adapter: TypeOrmAdapter.newAdapter((await this.authConfigs).casbin.db),
      },
    };

    return remoteConfigs;
  }
}
