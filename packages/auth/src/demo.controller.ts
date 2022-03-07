import { Body, Controller, Post, ALL, Provide, Logger, Inject } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';

@Provide()
@Controller('/v1/user')
export class UserController {
  @Logger('dash')
  logger: ILogger;

  @Inject()
  userService;

  @Post('/register')
  async register(@Body(ALL) body) {
    // this.userService.

    return;
  }

  @Post('/login')
  async login(@Body(ALL) body) {
    return;
  }
}
