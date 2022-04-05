import { Configuration, Inject } from '@midwayjs/decorator';
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
  NacosConfig,
  NacosConfigService,
  NacosNamingService,
} from '@letscollab/midway-nacos';
import { AUTH_SERVICE_NAME } from './contants';
// import YAML from 'yaml';
const YAML = require('yaml');

@Configuration({
  imports: [express, nacos],
  importConfigs: [resolve(__dirname, './config')],
})
export class AutoConfiguration implements ILifeCycle {
  @Inject()
  nacosConfigService: NacosConfigService;

  @Inject()
  nacosNamingService: NacosNamingService;

  @NacosConfig('yaml', YAML.parse)
  config;

  async onReady(
    container: IMidwayContainer,
    mainApp?: IMidwayBaseApplication<Context>,
  ): Promise<void> {
    console.log(this.config);
    // console.log(d1);
    // await this.nacosNamingService.registerInstance(AUTH_SERVICE_NAME, {
    //   port: 90,
    //   ip: '0.0.0.0',
    // });
  }

  async onConfigLoad(
    container: IMidwayContainer,
    mainApp?: IMidwayBaseApplication<Context>,
  ): Promise<any> {
    return;
  }
}
