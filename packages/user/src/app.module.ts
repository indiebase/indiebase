import {
  Injectable,
  Module,
  NestMiddleware,
  OnModuleInit,
} from '@nestjs/common';
import {
  NacosConfigModule,
  NacosConfigService,
  NacosNamingModule,
  NacosNamingService,
} from '@letscollab/nest-nacos';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import configure from './config';
import { UserModule } from './user/user.module';
import { I18nModule } from 'nestjs-i18n';
import { utilities, WinstonModule } from 'nest-winston';
import LokiTransport = require('winston-loki');
import { InjectRedis, RedisModule } from '@liaoliaots/nestjs-redis';
import * as winston from 'winston';
import { HttpAdapterHost } from '@nestjs/core';
import type { Redis } from 'ioredis';
import { RedisCookieSessionModule } from '@letscollab/helper';
const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  use(req: any, res: Response, next) {
    console.log(req.session);
    next();
  }
}

@Module({
  imports: [
    UserModule,
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
    RedisCookieSessionModule.forRootAsync({
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
        const configs = await config.getConfig('service-user.json');

        const transports: any[] = [
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
    I18nModule.forRoot({
      fallbackLanguage: 'zh-CN',
      loaderOptions: {
        path: resolve(process.cwd(), './i18n'),
        watch: !isProd,
      },
      logging: !isProd,
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
        const configs = await nacosConfigService.getConfig('service-user.json');
        return {
          ...configs.orm,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly nacosNamingService: NacosNamingService,
    private readonly adapterHost: HttpAdapterHost,
  ) {}

  async onModuleInit() {
    await this.nacosNamingService.registerInstance(
      `@letscollab/user-${process.env.NODE_ENV}`,
      {
        port: parseInt(this.configService.get('app.port')),
        ip: this.configService.get('app.hostname'),
      },
    );
  }
}
