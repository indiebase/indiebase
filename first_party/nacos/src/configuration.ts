import { MidwayContainer } from '@midwayjs/core';
import { Configuration } from '@midwayjs/decorator';

@Configuration({
  namespace: 'nacos',
  importConfigs: [
    {
      default: {
        nacosConfig: {},
        nacosNaming: {},
      },
    },
  ],
})
export class NacosConfiguration {
  public async onReady(container: MidwayContainer) {}
}
