import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import configure from './config';
import {
  NacosConfigModule,
  NacosConfigService,
  NacosNamingModule,
  NacosNamingService,
} from '@letscollab-nest/nacos';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { WinstonModule, utilities } from 'nest-winston';
import { AuthModule } from './auth/auth.module';
import * as winston from 'winston';
import LokiTransport = require('winston-loki');
import { ApplySessionModule, isDev, isProd } from '@letscollab-nest/helper';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { UserModule } from './user/user.module';
import TypeOrmAdapter from 'typeorm-adapter';
import { MsgModule } from './msg/msg.module';
import { CasbinModule } from '@letscollab-nest/accesscontrol';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MsgModule,
    // CollabModule,
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
    // This module integrated with Redis, Session Cookie, Fastify Passport.
    ApplySessionModule.forRootAsync({
      inject: [NacosConfigService],
      async useFactory(config: NacosConfigService) {
        const { session, cookie, redis } = await config.getConfig(
          'common.json',
        );

        session.saveUninitialized = false;
        return {
          session,
          cookie,
          redis,
        };
      },
    }),
    WinstonModule.forRootAsync({
      inject: [NacosConfigService],
      useFactory: async (config: NacosConfigService) => {
        const configs = await config.getConfig('community.json');

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
    CasbinModule.forRootAsync({
      imports: [NacosConfigModule],
      inject: [NacosConfigService],
      async useFactory(config: NacosConfigService) {
        const { orm, casbin } = await config.getConfig('common.json');

        return {
          model: resolve(
            __dirname,
            `../model/auth.${process.env.NODE_ENV}.conf`,
          ),
          adapter: await TypeOrmAdapter.newAdapter({
            type: 'mysql',
            username: orm.username,
            password: orm.password,
            database: casbin.database,
            host: orm.host,
            port: orm.port,
          }),
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
    TypeOrmModule.forRootAsync({
      imports: [NacosConfigModule],
      inject: [NacosConfigService],
      async useFactory(nacosConfigService: NacosConfigService) {
        const { orm } = await nacosConfigService.getConfig('common.json');
        return {
          ...orm,
          autoLoadEntities: true,
        };
      },
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'zh-CN',
      loaderOptions: {
        path: resolve(process.cwd(), './i18n'),
        watch: isDev,
      },
      resolvers: [
        new QueryResolver(),
        new HeaderResolver(['x-custom-lang']),
        new CookieResolver(),
        AcceptLanguageResolver,
      ],
      logging: isDev,
    }),
    MailerModule.forRootAsync({
      inject: [NacosConfigService],
      useFactory: async (config: NacosConfigService) => {
        const { mail } = await config.getConfig('common.json');

        return {
          transport: {
            host: mail.host,
            ignoreTLS: false,
            secure: true,
            auth: {
              user: mail.username,
              pass: mail.password,
            },
          },
          defaults: {
            from: `Deskbtm <${mail.username}>`,
          },
          preview: true,
          template: {
            dir: resolve(process.cwd(), 'public/tpl/'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
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
      `@letscollab/community-${process.env.NODE_ENV}`,
      {
        port: parseInt(this.configService.get('app.port')),
        ip: this.configService.get('app.hostname'),
      },
    );
  }
}
