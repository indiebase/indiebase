import { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';

import { KyselyAsyncOptions, KyselyOptions } from './kysely.interfaces';
import { KyselyCoreModule } from './kysely-core.module';

/**
 *
 * @example
 * ```ts
 *  KyselyModule.forRootAsync({
 *   inject: [ConfigService],
 *   useFactory: (config: ConfigService) => {
 *     const { host, port, password, user, database } = config.get('pg');
 *     const dialect = new PostgresDialect({
 *       pool: new Pool({
 *         database,
 *         password,
 *         host,
 *         user,
 *         port,
 *         max: 10,
 *       }),
 *     });
 *     return {
 *       extend(ky) {
 *         return new KyselyEx(ky);
 *       },
 *       synchronize: kDevMode,
 *       config: {
 *         dialect,
 *         plugins: [new CamelCasePlugin()],
 *       },
 *     };
 *   },
 * })
 * ```
 */
@Module({})
export class KyselyModule {
  public static forRoot(
    options: KyselyOptions,
    connection?: string,
  ): DynamicModule {
    return {
      module: KyselyModule,
      imports: [KyselyCoreModule.forRoot(options, connection)],
    };
  }

  public static forRootAsync(
    options: KyselyAsyncOptions,
    connection?: string,
  ): DynamicModule {
    return {
      module: KyselyModule,
      imports: [KyselyCoreModule.forRootAsync(options, connection!)],
    };
  }
}
