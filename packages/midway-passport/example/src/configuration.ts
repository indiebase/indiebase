import { App, Configuration } from '@midwayjs/decorator';
import { Application } from '@midwayjs/koa';

@Configuration({
  conflictCheck: true,
})
export class ContainerLifeCycle {
  @App()
  app: Application;

  async onReady() {
    // this.app.use(function (req, res, next) {
    //   console.log('url:', req.url);
    //   next();
    // });
  }
}
