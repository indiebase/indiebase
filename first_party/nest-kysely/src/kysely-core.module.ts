import {
  DynamicModule,
  OnApplicationShutdown,
  Provider,
  Type,
} from '@nestjs/common';
import { Global, Inject, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Kysely } from 'kysely';
import { defer, lastValueFrom } from 'rxjs';

import { KYSELY_MODULE_OPTIONS } from './kysely.constants';
import {
  KyselyAsyncOptions,
  KyselyOptions,
  KyselyOptionsFactory,
} from './kysely.interfaces';
import { getConnectionToken, handleRetry } from './kysely.utils';

@Global()
@Module({})
export class KyselyCoreModule implements OnApplicationShutdown {
  constructor(
    @Inject(KYSELY_MODULE_OPTIONS)
    private readonly options: KyselyOptions,
    private readonly moduleRef: ModuleRef,
  ) {}

  static forRoot(options?: KyselyOptions, connection?: string): DynamicModule {
    const knexOptions = {
      provide: KYSELY_MODULE_OPTIONS,
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
      module: KyselyCoreModule,
      providers: [connectionProvider, connectionProviderEx, knexOptions],
      exports: [connectionProvider, connectionProviderEx],
    };
  }

  public static forRootAsync(
    options: KyselyAsyncOptions,
    connection: string,
  ): DynamicModule {
    const connectionProvider: Provider = {
      provide: getConnectionToken(connection),
      useFactory: async (options: KyselyOptions) => {
        return await this.createConnectionFactory(options);
      },
      inject: [KYSELY_MODULE_OPTIONS],
    };

    const connectionProviderEx: Provider = {
      provide: getConnectionToken(connection, true),
      useFactory: async (options: KyselyOptions) => {
        return await this.createConnectionFactory(options, true);
      },
      inject: [KYSELY_MODULE_OPTIONS],
    };

    return {
      module: KyselyCoreModule,
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
    const connection = this.moduleRef.get<Kysely<unknown>>(
      getConnectionToken(this.options as KyselyOptions) as Type<
        Kysely<unknown>
      >,
    );
    connection && (await connection.destroy());
  }

  public static createAsyncProviders(options: KyselyAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    const useClass = options.useClass as Type<KyselyOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  public static createAsyncOptionsProvider(
    options: KyselyAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: KYSELY_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [
      (options.useClass || options.useExisting) as Type<KyselyOptionsFactory>,
    ];

    return {
      provide: KYSELY_MODULE_OPTIONS,
      useFactory: async (
        optionsFactory: KyselyOptionsFactory,
      ): Promise<KyselyOptions> => {
        return await optionsFactory.createKyselyOptions();
      },
      inject,
    };
  }

  private static async createConnectionFactory(
    options: KyselyOptions,
    ex: boolean = false,
  ): Promise<Kysely<any>> {
    return lastValueFrom(
      defer(async () => {
        const k = new Kysely(options.config);
        return ex && options.extend ? options.extend(k) : k;
      }).pipe(handleRetry(options.retryAttempts, options.retryDelay)),
    );
  }
}
