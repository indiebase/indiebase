import { NacosConfigClientOptions } from '@letscollab/midway-nacos';
import { MidwayAppInfo, MidwayConfig } from '@midwayjs/core';

interface CustomConfig {
  nacosConfig: NacosConfigClientOptions;
}

export default (appInfo: MidwayAppInfo): MidwayConfig & CustomConfig => {
  return {
    nacosConfig: {
      namespace: 'development',
      serverAddr: '0.0.0.0:13324',
    },
  };
};
