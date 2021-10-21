import { Context, IApplicationContext } from '@midwayjs/core';
import { App, Inject } from '@midwayjs/decorator';
export class HandlebarsView {
  @Inject()
  ctx: Context;

  @App()
  app: IApplicationContext;

  render(name, locals) {
    return new Promise((resolve, reject) => {
      // this.app.nunjucks.render(name, locals, (err, result) => {
      //   if (err) return reject(err);
      //   resolve(result);
      // });
    });
  }

  renderString(tpl, locals, opts) {
    return new Promise((resolve, reject) => {});
  }
}
