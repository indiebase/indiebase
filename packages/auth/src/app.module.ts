import { JwtModule } from '@nestjs/jwt';
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AppController from './app.controller';
import { resolve } from 'path';
import configure from './config';
import { AuthModule } from '@/auth/auth.module';
import { AuthZModule, AUTHZ_ENFORCER } from 'nest-authz';
import TypeORMAdapter from 'typeorm-adapter';
import {
  NacosConfigModule,
  NacosConfigService,
  NacosNamingModule,
  NacosNamingService,
} from '@letscollab/nestjs-nacos';
import * as casbin from 'casbin';
import { AUTH_SERVICE_NAME } from './app.constants';

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
    AuthZModule.register({
      imports: [NacosConfigModule],
      enforcerProvider: {
        provide: AUTHZ_ENFORCER,
        useFactory: async (config: NacosConfigService) => {
          const configs = await config.getConfig('service-auth.json');

          return casbin.newEnforcer(
            resolve(__dirname, '../model/auth.conf'),
            await TypeORMAdapter.newAdapter(configs.casbin.db),
          );
        },
        inject: [NacosConfigService],
      },
      usernameFromContext: (ctx) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user && request.user.username;
      },
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule, NacosConfigModule],
      useFactory: async (config: NacosConfigService) => {
        const configs = await config.getConfig('service-auth.json');
        return configs.jwt;
      },
      inject: [NacosConfigService],
    }),
  ],
  controllers: [AppController],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly nacosNamingService: NacosNamingService,
  ) {}

  async onModuleInit() {
    await this.nacosNamingService.client.registerInstance(AUTH_SERVICE_NAME, {
      port: parseInt(this.configService.get('app.port')),
      ip: this.configService.get('app.hostname'),
    });
  }
}
