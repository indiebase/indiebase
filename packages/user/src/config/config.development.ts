import { MidwayCasbinConfigs } from '@letscollab/midway-casbin/src/casbin.interface';
import {
  NacosConfigClientOptions,
  NacosNamingClientOptions,
} from '@letscollab/midway-nacos';
import { MidwayAppInfo, MidwayConfig } from '@midwayjs/core';
import { resolve } from 'path';
import TypeOrmAdapter from 'typeorm-adapter';
import YAML from 'yaml';

interface CustomConfig extends MidwayConfig {
  nacosConfig: NacosConfigClientOptions;
  nacosNaming: NacosNamingClientOptions;
  casbin?: MidwayCasbinConfigs;
  [k: string]: any;
}

export default (appInfo: MidwayAppInfo): CustomConfig => {
  return {
    express: {
      port: 23332,
    },
    midwayLogger: {
      default: {
        level: 'none',
        consoleLevel: 'all',
      },
    },
    rabbitmq: {
      url: 'amqp://127.0.0.1:25552',
    },
    casbin: { model: '1' },
    nacosConfig: {
      namespace: 'development',
      serverAddr: '0.0.0.0:13324',
    },
    nacosNaming: {
      namespace: 'development',
      serverList: '0.0.0.0:13324',
    },
  };
};
