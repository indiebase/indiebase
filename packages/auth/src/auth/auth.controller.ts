import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ role: 'auth', cmd: 'check' })
  async loggedIn(data) {
    try {
      const res = this.authService.validateUser(data.jwt);

      return res;
    } catch (e) {
      Logger.log(e);
      return false;
    }
  }

  @Get('demo')
  @UseGuards(LocalAuthGuard)
  async demo() {
    console.log('');
    return 'demo';
  }
}
