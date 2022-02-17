import { NacosConfigService } from '@letscollab/nestjs-nacos';
import { Controller, Get, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export default class AuthController {
  constructor(private nacosConfigService: NacosConfigService) {}

  @MessagePattern({ cmd: 'sum' })
  async demo() {
    return 'demo';
  }
}
