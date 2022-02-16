import { NacosConfigService } from '@letscollab/nestjs-nacos';
import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly nacosConfigService: NacosConfigService,
  ) {}

  @Get()
  async getHello(@Req() req): Promise<string> {
    const a = await this.nacosConfigService.client.getConfig(
      'nacos.test.1',
      'DEFAULT_GROUP',
    );
    console.log(a);

    // console.log(req);
    return this.appService.getHello();
  }

  @Get('jwt')
  getJwt(@Req() req): string {
    console.log(req);
    return 'jwt';
  }
}
