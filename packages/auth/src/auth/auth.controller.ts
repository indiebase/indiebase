import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'sum' })
  async loggedIn(data) {
    console.log(data);
    return '1233333333333333333333';
  }

  @Get('demo')
  @UseGuards(LocalAuthGuard)
  async demo() {
    console.log('');
    return 'demo';
  }
}
