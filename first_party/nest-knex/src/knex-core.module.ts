import {
  Global,
  Module,
  DynamicModule,
  Provider,
  Type,
  OnApplicationShutdown,
  Inject,
} from '@nestjs/common';
import {
  KnexAsyncOptions,
  KnexOptions,
  KnexOptionsFactory,
} from './knex.interfaces';
import { getConnectionToken, handleRetry } from './knex.utils';
import { KNEX_MODULE_OPTIONS, KNEX_SYNC } from './knex.constants';
import { knex, Knex } from 'knex';
import { ModuleRef } from '@nestjs/core';
import { defer, lastValueFrom } from 'rxjs';

@Global()
@Module({})
export class KnexCoreModule implements OnApplicationShutdown {
  constructor(
    @Inject(KNEX_MODULE_OPTIONS)
    private readonly options: KnexOptions,
    private readonly moduleRef: ModuleRef,
  ) {}

  static forRoot(options: KnexOptions, connection?: string): DynamicModule {
    const KnexOptions = {
      provide: KNEX_MODULE_OPTIONS,
      useValue: options,
    };

    const connectionProvider: Provider = {
      provide: getConnectionToken(connection),
      useFactory: async () => await this.createConnectionFactory(options),
    };

    const connectionProviderEx: Provider = {
      provide: getConnectionToken(connection, true),
      useFactory: async () => await this.createConnectionFactory(options, true),
    };

    return {
      module: KnexCoreModule,
      providers: [connectionProvider, connectionProviderEx, KnexOptions],
      exports: [connectionProvider, connectionProviderEx],
    };
  }

  public static forRootAsync(
    options: KnexAsyncOptions,
    connection: string,
  ): DynamicModule {
    const connectionProvider: Provider = {
      provide: getConnectionToken(connection),
      useFactory: async (options: KnexOptions) => {
        return await this.createConnectionFactory(options);
      },
      inject: [KNEX_MODULE_OPTIONS],
    };

    const connectionProviderEx: Provider = {
      provide: getConnectionToken(connection, true),
      useFactory: async (options: KnexOptions) => {
        return await this.createConnectionFactory(options, true);
      },
      inject: [KNEX_MODULE_OPTIONS],
    };

    return {
      module: KnexCoreModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options),
        connectionProvider,
        connectionProviderEx,
      ],
      exports: [connectionProvider, connectionProviderEx],
    };
  }

  async onApplicationShutdown(): Promise<any> {
    const connection = this.moduleRef.get<Knex>(
      getConnectionToken(this.options as KnexOptions) as Type<Knex>,
    );
    connection && (await connection.destroy());
  }

  public static createAsyncProviders(options: KnexAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    const useClass = options.useClass as Type<KnexOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  public static createAsyncOptionsProvider(
    options: KnexAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: KNEX_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [
      (options.useClass || options.useExisting) as Type<KnexOptionsFactory>,
    ];

    return {
      provide: KNEX_MODULE_OPTIONS,
      useFactory: async (
        optionsFactory: KnexOptionsFactory,
      ): Promise<KnexOptions> => {
        return await optionsFactory.createKnexOptions();
      },
      inject,
    };
  }

  private static async createConnectionFactory(
    options: KnexOptions,
    ex: boolean = false,
  ): Promise<Knex> {
    return lastValueFrom(
      defer(async () => {
        globalThis[KNEX_SYNC] = options.synchronize ?? false;
        const k = knex(options.config);

        return ex && options.extend ? options.extend(k) : k;
      }).pipe(handleRetry(options.retryAttempts, options.retryDelay)),
    );
  }
}
