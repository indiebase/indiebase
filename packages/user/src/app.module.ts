import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  NacosNamingModule,
  NacosNamingService,
} from '@letscollab/nestjs-nacos';

@Module({
  imports: [
    NacosNamingModule.forRoot({
      serverList: '0.0.0.0:13324',
      namespace: 'abea31e1-648f-496f-80d1-6811953572d7',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private nacosNamingService: NacosNamingService) {}
  async onModuleInit() {
    await this.nacosNamingService.client.registerInstance('demo1', {
      ip: '1.1.1.1',
      port: 11111,
    });
  }
}
