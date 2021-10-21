import { ALL, Provide, Logger } from '@midwayjs/decorator';
import { Validate } from '@midwayjs/decorator';
import { Body, Controller, Post } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';
import { UserRegisterDto } from './user.dto';

@Provide()
@Controller('/v1/user')
export class UserController {
  @Logger('dash')
  logger: ILogger;

  @Post('/register')
  // @Validate()
  async register(@Body(ALL) body: UserRegisterDto) {
    this.logger.info('fucker');
    return { demo: 1 };
  }
}
