import { Loose } from '@letscollab/utils';
import { MidwayAppInfo, MidwayConfig } from '@midwayjs/core';

export default (appInfo: MidwayAppInfo): Loose<MidwayConfig> => {
  return {
    keys: '1639994056460_8009',
    express: {
      port: 7001,
    },
  };
};
