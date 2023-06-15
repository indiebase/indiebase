import { MysqlConnectionCredentialsOptions } from 'typeorm/driver/mysql/MysqlConnectionCredentialsOptions';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Logger, Module, ModuleMetadata } from '@nestjs/common';
import { resolve } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import TypeOrmAdapter from 'typeorm-adapter';
import { ConfigService } from '@nestjs/config';
import { IsEntityExistedConstraint, kDevMode } from '@indiebase/server-shared';
import { CasbinModule } from '@indiebase/nest-casbin';
import { OctokitModule } from '@indiebase/nest-octokit';
import { RedisClientOptions, RedisModule } from '@liaoliaots/nestjs-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import { UserModule } from './user';
import { StorageModule } from './storage';
import { OrgModule } from './org';
import { ProjectModule } from './project';
import { InvitationModule } from './invitation';
import { MailModule } from './mail';
import { AuthModule } from './auth';
const LokiTransport = require('winston-loki');

/**
 * This module is the basic module of Lets, which contains the basic function of Lets Community:
 * {@link UserModule},{@link StorageModule}, {@link OrgModule}, {@link ProjectModule} etc.
 *
 *
 * @param options
 * @returns
 */
export const createCommunityModule = function (options: ModuleMetadata = {}) {
  @Module({
    imports: [
      UserModule,
      StorageModule,
      OrgModule,
      ProjectModule,
      InvitationModule,
      MailModule,
      AuthModule,
      ...options.imports,
      RedisModule.forRootAsync({
        inject: [ConfigService],
        async useFactory(config: ConfigService) {
          const { host, password, port } =
            config.get<RedisClientOptions>('redis');
          return {
            config: {
              host,
              port,
              password,
            },
          };
        },
      }),
      WinstonModule.forRootAsync({
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const { host } = configService.get('logger');
          const transports = [
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.timestamp(),
                utilities.format.nestLike(),
              ),
            }),
            new LokiTransport({
              json: true,
              host,
            }),
          ];
          return {
            level: kDevMode ? 'debug' : 'warn',
            format: winston.format.json(),
            exitOnError: false,
            rejectionHandlers: [
              new LokiTransport({
                json: true,
                host,
              }),
            ],
            transports,
          };
        },
      }),
      CasbinModule.forRootAsync({
        inject: [ConfigService],
        async useFactory(config: ConfigService) {
          const database = config.get('auth.database');
          const { username, password, host, port } =
            config.get<MysqlConnectionCredentialsOptions>('mysql');
          return {
            model: resolve(
              __dirname,
              `../model/auth.${process.env.NODE_ENV}.conf`,
            ),
            adapter: TypeOrmAdapter.newAdapter({
              type: 'mysql',
              username,
              password,
              database,
              host,
              port,
            }),
          };
        },
      }),
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        async useFactory(configService: ConfigService) {
          const { host, port, username, password, database } =
            configService.get<MysqlConnectionCredentialsOptions>('mysql');

          return {
            type: 'mysql',
            synchronize: kDevMode,
            host,
            port,
            username,
            password,
            database,
            autoLoadEntities: true,
            charset: 'utf8mb4_0900_ai_ci',
          };
        },
      }),
      MailerModule.forRootAsync({
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => {
          const { host, username, password, from } = config.get('smtp');
          return {
            transport: {
              host,
              ignoreTLS: false,
              secure: true,
              auth: {
                user: username,
                pass: password,
              },
            },
            defaults: {
              from: `${from} <${username}>`,
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
      OctokitModule.forRootAsync({
        async useFactory() {
          return {
            optionsFactory(req) {
              return {
                auth: req.session?.user?.githubAccessToken,
              };
            },
          };
        },
      }),
    ],
    providers: [
      Logger,
      IsEntityExistedConstraint,
      ...(options.providers ?? []),
    ],
  })
  class CommunityModule {}

  return CommunityModule as any;
};
