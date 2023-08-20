import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Logger, Module, ModuleMetadata } from '@nestjs/common';
import { resolve } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { kDevMode } from '@indiebase/server-shared';
import { OctokitModule } from '@indiebase/nest-octokit';
import { RedisClientOptions, RedisModule } from '@liaoliaots/nestjs-redis';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import { KnexModule } from '@indiebase/nest-knex';
import { ProbeModule } from './probe';
import { OpenObserveTransport } from 'winston-openobserve';
import { AuthModule } from './auth';

/**
 * This module is the basic module of Lets, which contains the basic function of Lets Community:
 * {@link UserModule},{@link StorageModule}, {@link OrgModule}, {@link ProjectModule} etc.
 *
 * @param options
 * @returns
 */
export const createCommunityModule = function (
  options: NonNullable<ModuleMetadata> = {},
) {
  @Module({
    imports: [
      // UserModule,
      // StorageModule,
      // OrgModule,
      // ProjectModule,
      // InvitationModule,
      // MailModule,
      AuthModule,
      ProbeModule,
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
        useFactory: (config: ConfigService) => {
          const { host, defaultOrg, defaultStream, username, password } =
            config.get('open_observe');

          const openObserveTransport = new OpenObserveTransport({
            bulk: true,
            host,
            defaultOrg,
            defaultStream,
            interval: 2000,
            cleanOnRequestError: true,
            onConnectionError(_error, close) {
              close();
            },
            basicAuth: {
              username,
              password,
            },
          });

          const transports = [
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.timestamp(),
                utilities.format.nestLike(),
              ),
            }),
            openObserveTransport,
          ];
          return {
            level: kDevMode ? 'debug' : 'warn',
            format: winston.format.json(),
            exitOnError: false,
            handleRejections: true,
            rejectionHandlers: [openObserveTransport],
            transports,
          };
        },
      }),
      KnexModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          const { host, port, password, user, database } = config.get('pg');

          return {
            config: {
              client: 'pg',
              connection: {
                host,
                port,
                user,
                password,
                database,
              },
            },
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
                auth: '',
              };
            },
          };
        },
      }),
    ],
    providers: [
      Logger,
      // IsEntityExistedConstraint,
      ...(options.providers ?? []),
    ],
  })
  class CommunityModule {}

  return CommunityModule as any;
};
