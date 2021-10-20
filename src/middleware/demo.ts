// import { App, Provide } from '@midwayjs/decorator';
// // import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/express';
// import * as passport from 'passport';
// import { IMidwayExpressApplication, IWebMiddleware, Middleware } from '@midwayjs/express';
// import { REQUEST_OBJ_CTX_KEY } from '@midwayjs/core';

// @Provide()
// export class ReportMiddleware implements IWebMiddleware {
//   @App()
//   app: IMidwayExpressApplication;

//   resolve() {
//     const handler: Middleware = (req, res, next) => {
//       console.log(req);

//       passport.authenticate('local', (...d) => {
//         try {
//           console.log(d);
//         } catch (err) {
//           console.log(err);
//         }
//       })(req, res, err => {
//         console.log(err);
//       });
//       next();
//     };
//     return handler;
//   }
// }
