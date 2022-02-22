import { Module, OnModuleInit } from '@nestjs/common';
import {
  NacosNamingModule,
  NacosConfigModule,
  NacosNamingService,
  NacosConfigService,
} from '@letscollab/nestjs-nacos';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NACOS_USER_DATA_ID, USER_SERVICE_NAME } from './app.constants';
import { NacosUtils } from '@letscollab/utils';
import { resolve } from 'path';
import configure from '@/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
      isGlobal: true,
      load: configure,
    }),
    NacosNamingModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          serverList: config.get('nacos.serverList'),
          namespace: config.get('nacos.namespace'),
        };
      },
    }),
    NacosConfigModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          serverAddr: config.get('nacos.serverList'),
          namespace: config.get('nacos.namespace'),
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [NacosConfigModule],
      inject: [NacosConfigService],
      async useFactory(nacosConfigService: NacosConfigService) {
        const configs = await NacosUtils.getConfig(
          nacosConfigService,
          NACOS_USER_DATA_ID,
        );
        return configs.mysql;
      },
    }),
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private nacosNamingService: NacosNamingService,
    private readonly nacosConfigService: NacosConfigService,
  ) {}
  async onModuleInit() {
    // const configs = await NacosUtils.getConfig(
    //   this.nacosConfigService,
    //   NACOS_USER_DATA_ID,
    // );
    // await this.nacosNamingService.client.registerInstance(USER_SERVICE_NAME, {
    //   ip: '0.0.0.0',
    //   port: configs.app.userMicroservicePort,
    // });
    // this.nacosNamingService.client.subscribe(USER_SERVICE_NAME, (...e) => {
    //   console.log(e);
    // });
  }
}
