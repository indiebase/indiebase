// import {
//   Provide,
//   Logger,
//   Get,
//   Inject,
//   Aspect,
//   IMethodAspect,
//   JoinPoint,
// } from '@midwayjs/decorator';
// import { Controller, Post } from '@midwayjs/decorator';
// import { ILogger } from '@midwayjs/logger';
// import { Jwt } from '@letscollab/midway-jwt';
// import { Context } from '@midwayjs/express';
// import { Clients } from '@midwayjs/grpc';
// import { helloworld } from '@letscollab/auth';

// @Provide()
// @Controller('/test')
// export class TestPackagesController {
//   @Logger('dash')
//   logger: ILogger;

//   @Inject()
//   ctx: Context | any;

//   @Inject()
//   jwt: Jwt;

//   @Post('/local-passport', { middleware: ['localPassportMiddleware'] })
//   async localPassport() {
//     return this.ctx.req.user;
//   }

//   @Post('/jwt-passport', { middleware: ['jwtPassportMiddleware'] })
//   async jwtPassport() {
//     throw new Error('demo');

//     return this.ctx.req.demo;
//   }

//   @Post('/gen-jwt')
//   async genJwt() {
//     return {
//       t: await this.jwt.sign({ msg: 'Hello Midway' }),
//     };
//   }
// }

// @Provide()
// @Aspect(TestPackagesController)
// export class ReportInfo implements IMethodAspect {
//   afterThrow(joinPoint: JoinPoint, error: Error) {
//     console.log(joinPoint, error);
//   }
// }

// @Provide()
// @Controller('/auth')
// export class AuthController {
//   @Inject()
//   ctx: Context | any;

//   @Get('/github-oauth', { middleware: ['github'] })
//   async githubOAuth() {
//     return {};
//   }

//   @Get('/github-cb', { middleware: ['github'] })
//   async githubOAuthCallback() {
//     console.log(this.ctx.req.user);
//     return this.ctx.req.user;
//   }

//   // @Get('/qq-oauth', { middleware: ['qq'] })
//   // async qqOAuth() {
//   //   return {};
//   // }

//   // @Get('/qq-cb', { middleware: ['qq'] })
//   // async qqOAuthCallback() {
//   //   console.log(this.ctx.req.user);
//   //   return this.ctx.req.user;
//   // }

//   // @Get('/google-oauth', { middleware: ['google'] })
//   // async googleOAuth() {
//   //   return {};
//   // }

//   // @Get('/google-cb', { middleware: ['google'] })
//   // async googleOAuthCallback() {
//   //   console.log(this.ctx.req.user);
//   //   return this.ctx.req.user;
//   // }
// }

// @Provide()
// @Controller('/auth1')
// export class Auth1Controller {
//   @Inject()
//   ctx: Context | any;

//   @Inject()
//   grpcClients: Clients;

//   @Get('/google-oauth')
//   async googleOAuth() {
//     const greeterService =
//       this.grpcClients.getService<helloworld.GreeterClient>('helloworld.Greeter');
//     const result = await greeterService.sayHello().sendMessage({
//       name: 'harry',
//     });

//     console.log(result);

//     return {
//       name: 'demo',
//     };
//   }

//   // @Get('/google-cb', { middleware: ['google'] })
//   // async googleOAuthCallback() {
//   //   console.log(this.ctx.req.user);
//   //   return this.ctx.req.user;
//   // }
// }
