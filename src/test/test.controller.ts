import { ALL, Provide, Logger, Get, Inject } from '@midwayjs/decorator';
import { Body, Controller, Post } from '@midwayjs/decorator';
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

  @Post('/local-passport', { middleware: ['localPassportMiddleware'] })
  async localPassport(@Body(ALL) body) {
    return body;
  }

  @Post('/jwt-passport')
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
