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
import {
  NacosConfig,
  NacosConfigService,
  NacosNamingService,
} from '@letscollab/midway-nacos';
import { CasbinService } from '@letscollab/midway-casbin';
const YAML = require('yaml');

@Configuration({
  imports: [express, nacos, casbin],
  importConfigs: [resolve(__dirname, './config')],
})
export class AutoConfiguration implements ILifeCycle {
  @Inject()
  nacosConfigService: NacosConfigService;

  @Inject()
  nacosNamingService: NacosNamingService;
  @Inject()
  casbinService: CasbinService;

  @NacosConfig('service-auth.json')
  authConfigs;

  async onReady(
    container: IMidwayContainer,
    mainApp?: IMidwayBaseApplication<Context>,
  ): Promise<void> {}

  async onConfigLoad(): Promise<any> {
    return {
      casbin: {
        model: resolve(__dirname, '../model/base.conf'),
        adapter: TypeOrmAdapter.newAdapter((await this.authConfigs).casbin.db),
      },
    };
  }
}
