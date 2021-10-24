import { Frontier } from '@deskbtm/midway-passport/src/express';
import { ALL, Provide, Logger, Get, Inject } from '@midwayjs/decorator';
import { Body, Controller, Post } from '@midwayjs/decorator';
import { LocalPassportControl } from '@/auth/local.control';
import { JwtPassportControl } from '@/auth/jwt.control';
import { ILogger } from '@midwayjs/logger';
import { Jwt } from '@deskbtm/midway-jwt';

@Provide()
@Controller('/test')
export class TestPackagesController {
  @Logger('dash')
  logger: ILogger;

  @Inject()
  ctx: any;

  @Inject()
  jwt: Jwt;

  @Get('/handlebars')
  async register() {
    // this.ctx.render()
  }

  @Post('/local-passport')
  @Frontier(LocalPassportControl)
  async localPassport(@Body(ALL) body) {
    console.log('dmeomodmeo');
    // console.log(this.ctx.req);
    // console.log(this.ctx.req.user);
    return body;
  }

  @Post('/jwt-passport')
  @Frontier(JwtPassportControl)
  async jwtPassport(@Body(ALL) body) {
    return body;
  }

  @Post('/gen-jwt')
  async genJwt() {
    console.log(this);
    return {
      t: await this.jwt.sign({ msg: 'Hello Midway' }),
    };
  }
}
