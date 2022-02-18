import { UserModule } from './../../user/src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AppController from './app.controller';
import { NACOS_DATA_ID, SERVICE_NAME } from './app.constants';
import { resolve } from 'path';
import configure from './config';
import { CasbinModule } from '@letscollab/nestjs-casbin';
import { NacosUtils } from '@letscollab/utils';
import TypeOrmAdapter from 'typeorm-adapter';
import { AuthModule } from '@/auth/auth.module';
import {
  NacosNamingModule,
  NacosConfigModule,
  NacosNamingService,
  NacosConfigService,
} from '@letscollab/nestjs-nacos';

@Module({
  imports: [
    UserModule,
    AuthModule,
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
    CasbinModule.forRootAsync({
      imports: [NacosConfigModule],
      useFactory: async (nacosConfigService: NacosConfigService) => {
        const options = await NacosUtils.getConfig(
          nacosConfigService,
          NACOS_DATA_ID,
        );

        return {
          model: resolve(__dirname, '../model/auth.conf'),
          adapter: TypeOrmAdapter.newAdapter(options.casbin.db),
        };
      },
      inject: [NacosConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwt.secret'),
        signOptions: { expiresIn: config.get('jwt.expire') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  exports: [],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly nacosNamingService: NacosNamingService,
    private readonly nacosConfigService: NacosConfigService,
  ) {}

  async onModuleInit() {
    await this.nacosNamingService.client.registerInstance(SERVICE_NAME, {
      ip: '1.1.1.1',
      port: 11111,
    });

    // const str = {
    //   name: 'demo',
    // };

    // await this.nacosConfigService.client.publishSingle(
    //   dataId,
    //   group,
    //   JSON.stringify(str),
    // );
  }
}
