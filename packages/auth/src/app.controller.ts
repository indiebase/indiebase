import { NacosConfigService } from '@letscollab/nestjs-nacos';
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from './auth/jwt.guard';
import { LocalAuthGuard } from './auth/local.guard';

@Controller('auth')
export default class AppController {
  constructor(private nacosConfigService: NacosConfigService) {}

  @MessagePattern({ cmd: 'sum' })
  async demo() {
    return 'demo';
  }

  @Get('fuck')
  @UseGuards(LocalAuthGuard)
  async demo1() {
    return 'demo';
  }
}
