import { Provide, Logger, Get, Inject } from '@midwayjs/decorator';
import { Controller, Post } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';
import { Jwt } from '@deskbtm/midway-jwt';
import { Context } from '@midwayjs/web';

@Provide()
@Controller('/test')
export class TestPackagesController {
  @Logger('dash')
  logger: ILogger;

  @Inject()
  ctx: Context | any;

  @Inject()
  jwt: Jwt;

  @Get('/handlebars')
  async register() {
    // this.ctx.render()
  }

  @Post('/local-passport', { middleware: ['localPassportMiddleware'] })
  async localPassport() {
    console.log('local user: ', this.ctx.req.user);
    return this.ctx.req.user;
  }

  @Post('/jwt-passport', { middleware: ['jwtPassportMiddleware'] })
  async jwtPassport() {
    return this.ctx.req.demo;
  }

  @Post('/gen-jwt')
  async genJwt() {
    return {
      t: await this.jwt.sign({ msg: 'Hello Midway' }),
    };
  }
}

@Provide()
@Controller('/auth')
export class AuthController {
  @Inject()
  ctx: Context | any;

  @Get('/github-oauth', { middleware: ['github'] })
  async githubOAuth() {
    return {};
  }

  @Get('/github-cb', { middleware: ['github'] })
  async githubOAuthCallback() {
    console.log(this.ctx.req.user);
    return this.ctx.req.user;
  }

  // @Get('/qq-oauth', { middleware: ['qq'] })
  // async qqOAuth() {
  //   return {};
  // }

  // @Get('/qq-cb', { middleware: ['qq'] })
  // async qqOAuthCallback() {
  //   console.log(this.ctx.req.user);
  //   return this.ctx.req.user;
  // }

  // @Get('/google-oauth', { middleware: ['google'] })
  // async googleOAuth() {
  //   return {};
  // }

  // @Get('/google-cb', { middleware: ['google'] })
  // async googleOAuthCallback() {
  //   console.log(this.ctx.req.user);
  //   return this.ctx.req.user;
  // }
}
@Provide()
@Controller('/auth1')
export class Auth1Controller {
  @Inject()
  ctx: Context | any;

  @Get('/gitlab-oauth', { middleware: ['gitlab2'] })
  async qqOAuth() {
    return { name: 'demo' };
  }

  @Get('/gitlab-cb', { middleware: ['gitlab'] })
  async qqOAuthCallback() {
    console.log(this.ctx.req.user, '999999999999999999');
    return this.ctx.req.user;
  }

  // @Get('/google-oauth', { middleware: ['google'] })
  // async googleOAuth() {
  //   return {};
  // }

  // @Get('/google-cb', { middleware: ['google'] })
  // async googleOAuthCallback() {
  //   console.log(this.ctx.req.user);
  //   return this.ctx.req.user;
  // }
}
