import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import configure from './config';
import {
  NacosConfigModule,
  NacosConfigService,
  NacosNamingModule,
  NacosNamingService,
} from '@letscollab/nest-nacos';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { WinstonModule, utilities } from 'nest-winston';
import { AuthModule } from './auth/auth.module';
import * as winston from 'winston';
import LokiTransport = require('winston-loki');
import { CasbinModule } from '@letscollab/nest-ac';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmAdapter from 'typeorm-adapter';
import { RedisSessionModule } from '@letscollab/helper';

const isDev = process.env.NODE_ENV === 'development';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
      isGlobal: true,
      load: configure,
    }),
    RedisModule.forRootAsync({
      inject: [NacosConfigService],
      async useFactory(config: NacosConfigService) {
        const configs = await config.getConfig('common.json');
        return { config: configs.redis };
      },
    }),
    RedisSessionModule.forRootAsync({
      inject: [NacosConfigService],
      async useFactory(config: NacosConfigService) {
        const cc = await config.getConfig('common.json');
        cc.session.saveUninitialized = false;

        return cc;
      },
    }),
    WinstonModule.forRootAsync({
      inject: [NacosConfigService],
      useFactory: async (config: NacosConfigService) => {
        const configs = await config.getConfig('service-auth.json');

        const transports = [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              utilities.format.nestLike(),
            ),
          }),
          new LokiTransport(configs.logger.loki),
        ];

        return {
          level: isDev ? 'debug' : 'warn',
          format: winston.format.json(),
          defaultMeta: { service: 'auth' },
          exitOnError: false,
          rejectionHandlers: [new LokiTransport(configs.logger.rejectionLoki)],
          transports,
        };
      },
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
      inject: [NacosConfigService],
      async useFactory(config: NacosConfigService) {
        const configs = await config.getConfig('service-auth.json');

        return {
          model: resolve(
            __dirname,
            `../model/auth.${process.env.NODE_ENV}.conf`,
          ),
          adapter: await TypeOrmAdapter.newAdapter(configs.casbin.db),
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [NacosConfigModule],
      inject: [NacosConfigService],
      async useFactory(nacosConfigService: NacosConfigService) {
        const configs = await nacosConfigService.getConfig('service-auth.json');
        return {
          ...configs.orm,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [Logger],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly nacosNamingService: NacosNamingService,
  ) {}

  async onModuleInit() {
    await this.nacosNamingService.registerInstance(
      `@letscollab/auth-${process.env.NODE_ENV}`,
      {
        port: parseInt(this.configService.get('app.port')),
        ip: this.configService.get('app.hostname'),
      },
    );
  }
}
