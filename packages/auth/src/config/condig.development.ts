import {
  NacosConfigClientOptions,
  NacosNamingClientOptions,
} from '@letscollab/midway-nacos';
import { MidwayAppInfo, MidwayConfig } from '@midwayjs/core';
import YAML from 'yaml';

interface CustomConfig {
  nacosConfig: NacosConfigClientOptions;
  nacosNaming: NacosNamingClientOptions;
  [k: string]: any;
}

export default (appInfo: MidwayAppInfo): MidwayConfig & CustomConfig => {
  return {
    midwayLogger: {
      default: {
        level: 'none',
        consoleLevel: 'all',
      },
    },
    nacosConfig: {
      namespace: 'development',
      serverAddr: '0.0.0.0:13324',
      // dataParser(data) {
      //   return YAML.parse(data);
      // },
    },
    nacosNaming: {
      namespace: 'development',
      serverList: '0.0.0.0:13324',
    },
  };
};
