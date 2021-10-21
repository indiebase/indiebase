import {
  Context,
  ILifeCycle,
  IMidwayBaseApplication,
  IMidwayContainer,
} from '@midwayjs/core';
import { Configuration, Inject } from '@midwayjs/decorator';
import * as view from '@midwayjs/view';
import { HandlebarsView } from './handlebar.view';
import { join } from 'path';

@Configuration({
  namespace: 'view-handlebars',
  imports: [view],
  importConfigs: [join(__dirname, 'config')],
})
export class HandlebarsConfiguration implements ILifeCycle {
  @Inject()
  view: view.ViewManager;

  async onReady(container: IMidwayContainer, app?: any) {
    // app.handlebars = await container.getAsync(NunjucksEnvironment);
    this.view.use('handlebars', HandlebarsView);
  }
}
