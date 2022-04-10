import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LocalAuthGuard } from './local.guard';

@Controller('auth')
export class AuthController {
  constructor() {}

  @MessagePattern({ cmd: 'sum' })
  async loggedIn(data) {
    console.log(data);
    return '1233333333333333333333';
  }

  @UseGuards(LocalAuthGuard)
  @Get('login')
  async demo(@Request() req: Request) {
    return 'demo';
  }
}
