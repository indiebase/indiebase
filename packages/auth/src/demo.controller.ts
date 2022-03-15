import {
  Body,
  Controller,
  Get,
  OBJ_DEF_CLS,
  Param,
  Provide,
  Inject,
} from '@midwayjs/decorator';
// import second from 'typeorm';
// import { ILogger } from '@midwayjs/logger';

@Provide()
@Controller()
export class UserController {
  // @Logger('dash')
  // logger: ILogger;

  // @Inject()
  // userService;

  @Get('/register')
  async register(@Body() body) {
    // this.userService.
    console.log(
      Reflect.getMetadata(OBJ_DEF_CLS, UserController),
      '=========================',
    );

    return 'demo';
  }

  @Get('/login')
  async login(@Body() body, @Param('id') id) {
    return 'demo';
  }
}
