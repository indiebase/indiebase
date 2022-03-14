import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Provide,
  // Logger,
  // Inject,
} from '@midwayjs/decorator';
// import second from 'typeorm';
// import { ILogger } from '@midwayjs/logger';

@Provide()
@Controller('/v1/user')
export class UserController {
  // @Logger('dash')
  // logger: ILogger;

  // @Inject()
  // userService;

  @Post('/register')
  async register(@Body() body) {
    // this.userService.

    return;
  }

  @Get('/login')
  async login(@Body() body, @Param('id') id) {
    return 'demo';
  }
}
