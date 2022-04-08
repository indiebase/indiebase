import {
  Body,
  Consumer,
  Controller,
  Get,
  MSListenerType,
  Param,
  Provide,
} from '@midwayjs/decorator';

@Provide()
@Controller()
export class AuthController {
  @Get('/login')
  async login(@Body() body, @Param('id') id) {
    return 'demo';
  }
}
