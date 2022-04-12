import { NacosConfigService } from '@letscollab/nest-nacos';
import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class AppController {
  constructor(private readonly nacosConfigService: NacosConfigService) {}

  @Get('check')
  async demo1() {
    return this.nacosConfigService.getConfig('service-auth.json');
  }
}
