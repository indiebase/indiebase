import { MidwayAppInfo, MidwayConfig } from '@midwayjs/core';
import { ClientOptions } from 'nacos';

interface CustomConfig {
  nacosConfig: ClientOptions;
}

export default (appInfo: MidwayAppInfo): MidwayConfig & CustomConfig => {
  return {
    nacosConfig: {},
  };
};
