import { JwtModule } from '@nestjs/jwt';
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AppController from './app.controller';
import { AUTH_SERVICE_NAME } from './app.constants';
import { resolve } from 'path';
import configure from './config';
import { CasbinModule, CasbinService } from '@letscollab/nestjs-casbin';
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
        const configs = await nacosConfigService.getConfig('service-auth.json');

        return {
          model: resolve(__dirname, '../model/auth.conf'),
          adapter: TypeOrmAdapter.newAdapter(configs.casbin.db),
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
    private readonly casbinService: CasbinService,
  ) {}

  async onModuleInit() {
    const configs = await this.nacosConfigService.getConfig(
      'service-auth.json',
    );
    
    await this.nacosNamingService.client.registerInstance(AUTH_SERVICE_NAME, {
      port: configs.app.port,
      ip: configs.app.port,
    });
  }
}
