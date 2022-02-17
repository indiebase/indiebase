import { DemoModule } from './demo.module';
import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  NacosNamingModule,
  NacosConfigModule,
  NacosNamingService,
  NacosConfigService,
} from '@letscollab/nestjs-nacos';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    NacosNamingModule.forRoot({
      serverList: '0.0.0.0:13324',
      namespace: 'abea31e1-648f-496f-80d1-6811953572d7',
    }),
    NacosConfigModule.forRoot({
      serverAddr: '0.0.0.0:13324',
      namespace: 'abea31e1-648f-496f-80d1-6811953572d7',
    }),
    TypeOrmModule.forRootAsync({
      imports: [NacosConfigModule],
      inject: [NacosConfigService],
      async useFactory(nacosConfigService: NacosConfigService) {
        return {};
      },
    }),
    DemoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private nacosNamingService: NacosNamingService,
    private nacosConfigService: NacosConfigService,
  ) {}
  async onModuleInit() {
    await this.nacosNamingService.client.registerInstance('demo1', {
      ip: '1.1.1.1',
      port: 11111,
    });

    const dataId = 'nacos.test.1';
    const group = 'DEFAULT_GROUP';
    const str = `example_test_${Math.random()}_${Date.now()}`;

    await this.nacosConfigService.client.publishSingle(dataId, group, str);
    const content = await this.nacosConfigService.client.getConfig(
      dataId,
      group,
    );
    console.log('---------getConfig complete----------');
    console.log('current content => ' + content);

    // this.nacosConfigService.client.subscribe();
  }
}
