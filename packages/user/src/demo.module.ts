/*
https://docs.nestjs.com/modules
*/

import {
  NacosNamingModule,
  NacosNamingService,
} from '@letscollab/nestjs-nacos';
import { Module, OnModuleInit } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class DemoModule implements OnModuleInit {
  constructor(private nacosNamingService: NacosNamingService) {}

  async onModuleInit() {
    await this.nacosNamingService.client.registerInstance('demo2121', {
      ip: '1.1.1.1',
      port: 10000,
    });
  }
}
