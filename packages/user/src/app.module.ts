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
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  NACOS_USER_DATA_ID,
  NACOS_AUTH_DATA_ID,
  SERVICE_NAME,
} from './app.constants';
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
    // ClientsModule.registerAsync([
    //   {
    //     name: 'MATH_SERVICE',
    //     imports: [NacosConfigModule],
    //     inject: [NacosConfigService],
    //     async useFactory(nacosConfigService: NacosConfigService) {
    //       const configs = await NacosUtils.getConfig(
    //         nacosConfigService,
    //         NACOS_AUTH_DATA_ID,
    //       );
    //       return {
    //         transport: Transport.TCP,
    //         options: {
    //           port: configs.app.authMicroservicePort,
    //         },
    //       };
    //     },
    //   },
    // ]),
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
    await this.nacosNamingService.client.registerInstance(SERVICE_NAME, {
      ip: '1.1.1.1',
      port: 2222,
    });
  }
}
