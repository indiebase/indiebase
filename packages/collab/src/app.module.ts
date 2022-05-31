import { Module, OnModuleInit } from '@nestjs/common';
import { NacosConfigModule, NacosConfigService } from '@letscollab/nest-nacos';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import configure from './config';
import { TeamModule } from './team/team.module';
import { I18nModule } from 'nestjs-i18n';
import { utilities, WinstonModule } from 'nest-winston';
import LokiTransport = require('winston-loki');
import { RedisModule } from '@liaoliaots/nestjs-redis';
import * as winston from 'winston';

const isProd = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

@Module({
  imports: [
    TeamModule,
    ConfigModule.forRoot({
      envFilePath: resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
      isGlobal: true,
      load: configure,
    }),

    RedisModule.forRootAsync({
      inject: [NacosConfigService],
      async useFactory(config: NacosConfigService) {
        const configs = await config.getConfig('service-collab.json');
        return configs.redis;
      },
    }),

    WinstonModule.forRootAsync({
      inject: [NacosConfigService],
      useFactory: async (config: NacosConfigService) => {
        const configs = await config.getConfig('service-collab.json');

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
          level: isDevelopment ? 'debug' : 'warn',
          format: winston.format.json(),
          defaultMeta: { service: 'auth' },
          exitOnError: false,
          rejectionHandlers: [new LokiTransport(configs.logger.rejectionLoki)],
          transports,
        };
      },
    }),
    // NacosNamingModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory(config: ConfigService) {
    //     return {
    //       serverList: config.get('nacos.serverList'),
    //       namespace: config.get('nacos.namespace'),
    //     };
    //   },
    // }),
    I18nModule.forRoot({
      fallbackLanguage: 'zh',
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
        const configs = await nacosConfigService.getConfig(
          'service-collab.json',
        );
        return {
          ...configs.orm,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly nacosConfigService: NacosConfigService) {}
  async onModuleInit() {}
}
