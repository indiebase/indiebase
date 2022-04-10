import { AUTH_SERVICE_NAME } from '@/app.constants';
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('user')
export class UserController {
  constructor() {} // private readonly client: ClientProxy, // @Inject(AUTH_SERVICE_NAME)

  @Get('register')
  async demo() {
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3];
    return 'demo';
  }
}
