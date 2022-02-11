import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req): string {
    console.log(req);
    return this.appService.getHello();
  }

  @Get('jwt')
  getJwt(@Req() req): string {
    console.log(req);
    return 'jwt';
  }
}
