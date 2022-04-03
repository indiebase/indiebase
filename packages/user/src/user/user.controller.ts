import { AUTH_SERVICE_NAME } from '@/app.constants';
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(
    @Inject(AUTH_SERVICE_NAME)
    private readonly client: ClientProxy,
  ) {}

  @Get('demo')
  async demo() {
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3];
    const res = await lastValueFrom(this.client.send<number>(pattern, payload));
    console.log(res);
    return 'demo';
  }
}
