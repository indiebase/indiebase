import { NACOS_AUTH_DATA_ID } from './../app.constants';
import { NacosConfig, NacosConfigClient } from '@letscollab/nestjs-nacos';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.guard';
import { CasbinService } from '@letscollab/nestjs-casbin';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly casbinService: CasbinService,
  ) {}

  @MessagePattern({ cmd: 'sum' })
  async loggedIn(data) {
    console.log(data);
    return '1233333333333333333333';
  }

  @NacosConfig(NACOS_AUTH_DATA_ID)
  nacosConfig;

  @NacosConfigClient('dem')
  @UseGuards(LocalAuthGuard)
  @Get('demo')
  async demo() {
    console.log(this.casbinService);
    console.log(this.nacosConfig);
    console.log(Reflect.getMetadata('demo', AuthController));
    return 'demo';
  }
}
