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

@Module({
  imports: [
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
  constructor(private nacosNamingService: NacosNamingService) {}
  async onModuleInit() {
    await this.nacosNamingService.client.registerInstance(USER_SERVICE_NAME, {
      ip: '1.1.1.1',
      port: 2222,
    });
  }
}
