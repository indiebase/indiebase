import { ALL, Provide, Logger, Inject } from '@midwayjs/decorator';
import { Validate } from '@midwayjs/decorator';
import { Body, Controller, Post } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';

@Provide()
@Controller('/v1/user')
export class UserController {
  @Logger('dash')
  logger: ILogger;

  @Inject()
  userService;

  @Post('/register')
  @Validate()
  async register(@Body(ALL) body) {
    // this.userService.

    return;
  }

  @Post('/login')
  @Validate()
  async login(@Body(ALL) body) {
    return;
  }
}
