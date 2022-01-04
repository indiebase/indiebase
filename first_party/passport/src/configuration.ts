import {
  Context,
  ILifeCycle,
  IMidwayApplication,
  IMidwayBaseApplication,
  IMidwayContainer,
} from '@midwayjs/core';
import { App, Configuration } from '@midwayjs/decorator';
import { resolve } from 'path';
import DefaultConfig from './config/default.config';
@Configuration({
  namespace: 'passport',
  importConfigs: [
    {
      default: DefaultConfig,
    },
  ],
})
export class PassportConfiguration implements ILifeCycle {
  @App()
  app;

  async onReady(container: IMidwayContainer, app?: IMidwayBaseApplication<Context>): Promise<void> {
    console.log(this.app.useMiddleware);
  }
}
