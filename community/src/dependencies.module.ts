import { AsyncContextModule } from '@indiebase/nest-async-context';
import { CaslModule } from '@indiebase/nest-casl';
import { KnexModule } from '@indiebase/nest-knex';
import { OctokitModule } from '@indiebase/nest-octokit';
import { X_Indiebase_Lang } from '@indiebase/sdk';
import { BuiltinMgrRoles, KnexEx } from '@indiebase/server-shared';
import { RedisClientOptions, RedisModule } from '@liaoliaots/nestjs-redis';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule, utilities } from 'nest-winston';
import {
  I18nModule,
  QueryResolver,
  HeaderResolver,
  CookieResolver,
  AcceptLanguageResolver,
} from 'nestjs-i18n';
import path from 'node:path';
import { knexSnakeCaseMappers } from 'objection';
import * as winston from 'winston';
import { OpenObserveTransport } from 'winston-openobserve';

export interface DepsDynamicOptions {
  i18n: {
    path: string;
  };
}

export function createDependenciesModule(options: DepsDynamicOptions) {
  @Global()
  @Module({
    imports: [
      AsyncContextModule,
      I18nModule.forRoot({
        fallbackLanguage: 'en',
        loaderOptions: {
          path: options.i18n.path,
          watch: kDevMode,
        },
        resolvers: [
          new QueryResolver(),
          new HeaderResolver([X_Indiebase_Lang]),
          new CookieResolver(),
          new AcceptLanguageResolver(),
        ],
        logging: kDevMode,
      }),
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

          // console.log(config.get('pg'));

          return {
            /**
             * @todo
             */
            synchronize: kDevMode,
            extend(knex) {
              return new KnexEx(knex);
            },
            config: {
              client: 'pg',
              connection: {
                host,
                port,
                user,
                password,
                database,
              },
              ...knexSnakeCaseMappers(),
            },
          };
        },
      }),
      // KyselyModule.forRootAsync({
      //   inject: [ConfigService],
      //   useFactory: (config: ConfigService) => {
      //     const { host, port, password, user, database } = config.get('pg');
      //     const dialect = new PostgresDialect({
      //       pool: new Pool({
      //         database,
      //         password,
      //         host,
      //         user,
      //         port,
      //         max: 10,
      //       }),
      //     });

      //     return {
      //       extend(ky) {
      //         return new KyselyEx(ky);
      //       },
      //       /**
      //        * @todo
      //        */
      //       synchronize: kDevMode,
      //       config: {
      //         dialect,
      //         plugins: [new CamelCasePlugin()],
      //       },
      //     };
      //   },
      // }),

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
      CaslModule.forRootAsync({
        async useFactory() {
          return {
            superuserRole: BuiltinMgrRoles.OAA,
            getUserFromRequest(request) {
              return undefined;
            },
          };
        },
      }),
    ],
  })
  class DepsModule {}

  return DepsModule;
}
