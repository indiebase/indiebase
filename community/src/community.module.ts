import { InjectConnection, KnexModule } from '@indiebase/nest-knex';
import { KnexEx } from '@indiebase/server-shared';
import { OctokitModule } from '@indiebase/nest-octokit';
import { RedisClientOptions, RedisModule } from '@liaoliaots/nestjs-redis';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Logger, Module, ModuleMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule, utilities } from 'nest-winston';
import path from 'node:path';
import * as winston from 'winston';
import { OpenObserveTransport } from 'winston-openobserve';
import { ProbeModule } from './probe';

/**
 * This module is the basic module of Lets, which contains the basic function of Community:
 *
 * @param {NonNullable<ModuleMetadata>} options
 */
export const createCommunityModule = function (
  options: NonNullable<ModuleMetadata> = {},
) {
  @Module({
    imports: [
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
            synchronize: kDevMode,
            extend(knex) {
              return new KnexEx(knex);
            },
            config: {
              debug: kDevMode,
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
              dir: path.resolve(process.cwd(), 'public/tpl/'),
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
  class CommunityModule {
    constructor(
      @InjectConnection()
      private readonly ex: KnexEx,
    ) {
      ex.knex.schema.createTable('users', (table) => {
        table.increments();

        console.log(table);
      });
    }
  }

  return CommunityModule as any;
};
