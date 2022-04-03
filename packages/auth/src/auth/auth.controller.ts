import { NACOS_AUTH_DATA_ID } from '../app.constants';
import { NacosConfig } from '@letscollab/nestjs-nacos';
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

  @NacosConfig(NACOS_AUTH_DATA_ID)
  nacosConfig;

  // @NacosConfigClient('dem')
  @UseGuards(LocalAuthGuard)
  @Get('demo')
  async demo(@Request() req: Request) {
    return 'demo';
  }
}
