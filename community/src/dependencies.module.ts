import { AccessControlModule } from '@indiebase/nest-accesscontrol';
import { AsyncContextModule } from '@indiebase/nest-async-context';
import { KnexModule, knexSnakeCaseMappers } from '@indiebase/nest-knex';
import { OctokitModule } from '@indiebase/nest-octokit';
import { S3Module } from '@indiebase/nest-s3';
import { RedisClientOptions } from '@indiebase/nestjs-redis';
import { RedisModule } from '@indiebase/nestjs-redis';
import { X_Indiebase_Lang } from '@indiebase/sdk';
import { KnexEx } from '@indiebase/server-shared';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { utilities, WinstonModule } from 'nest-winston';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
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
          const redisConfig = config.get<RedisClientOptions>('redis');
          if (!redisConfig) throw new Error('Redis config gets null');

          const { host, password, port } = redisConfig;
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
            interval: 2e3,
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
      AccessControlModule.forRoot({
        // model: [
        //   {
        //     role: 'admin',
        //     resource: 'video',
        //     action: 'create:any',
        //     attributes: '*, !views',
        //   },
        //   {
        //     role: 'admin',
        //     resource: 'video',
        //     action: 'read:any',
        //     attributes: '*',
        //   },
        //   {
        //     role: 'admin',
        //     resource: 'video',
        //     action: 'update:any',
        //     attributes: '*, !views',
        //   },
        //   {
        //     role: 'admin',
        //     resource: 'video',
        //     action: 'delete:any',
        //     attributes: '*',
        //   },
        //   {
        //     role: 'user',
        //     resource: 'video',
        //     action: 'create:own',
        //     attributes: '*, !rating, !views',
        //   },
        //   {
        //     role: 'user',
        //     resource: 'video',
        //     action: 'read:any',
        //     attributes: '*',
        //   },
        //   {
        //     role: 'user',
        //     resource: 'video',
        //     action: 'update:own',
        //     attributes: '*, !rating, !views',
        //   },
        //   {
        //     role: 'user',
        //     resource: 'video',
        //     action: 'delete:own',
        //     attributes: '*',
        //   },
        // ],
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
      // MailerModule.forRootAsync({
      //   inject: [ConfigService],
      //   useFactory: async (config: ConfigService) => {
      //     const { host, username, password, from } = config.get('smtp');
      //     return {
      //       transport: {
      //         host,
      //         ignoreTLS: false,
      //         secure: true,
      //         auth: {
      //           user: username,
      //           pass: password,
      //         },
      //       },
      //       defaults: {
      //         from: `${from} <${username}>`,
      //       },
      //       preview: true,
      //       template: {
      //         dir: path.resolve(process.cwd(), 'public/tpl/'),
      //         adapter: new HandlebarsAdapter(),
      //         options: {
      //           strict: true,
      //         },
      //       },
      //     };
      //   },
      // }),
      S3Module.forRootAsync({
        inject: [ConfigService],
        useFactory: async (config) => {
          const { region, endpoint, accessKey, secretKey } =
            config.get('storage.s3');

          return {
            config: {
              region,
              endpoint: { url: new URL(endpoint) },
              forcePathStyle: true,
              credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretKey,
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
  })
  class DepsModule {}

  return DepsModule;
}
