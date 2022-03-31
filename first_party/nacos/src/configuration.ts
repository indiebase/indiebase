import { NacosConfigService } from './nacos.config';
import {
  Context,
  ILifeCycle,
  IMidwayBaseApplication,
  IMidwayContainer,
  IMidwayLogger,
  MidwayLoggerService,
} from '@midwayjs/core';
import { Configuration, Inject } from '@midwayjs/decorator';

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
export class NacosConfiguration implements ILifeCycle {
  @Inject()
  loggerService: MidwayLoggerService;

  @Inject()
  nacosConfigService: NacosConfigService;

  async onReady(
    container: IMidwayContainer,
    mainApp?: IMidwayBaseApplication<Context>,
  ): Promise<void> {
    const nacosNamingLogger = this.loggerService.getLogger(
      'customLogger',
    ) as IMidwayLogger;
    // appLogger.add();
  }

  async onStop(container: IMidwayContainer): Promise<void> {
    await this.nacosConfigService.close();
  }
}
