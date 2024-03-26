import { ModuleMetadata, Type } from '@nestjs/common';
import { Kysely, KyselyConfig } from 'kysely';

export interface KyselyAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  inject?: any[];
  useClass?: Type<KyselyOptionsFactory>;
  useExisting?: Type<KyselyOptionsFactory>;
  /**
   * Factory function that returns an instance of the provider to be injected.
   */
  useFactory?: (...args: any[]) => Promise<KyselyOptions> | KyselyOptions;
}

export interface KyselyOptionsFactory {
  createKyselyOptions(
    connectionName?: string,
  ): Promise<KyselyOptions> | KyselyOptions;
}

export interface KyselyOptions {
  name?: string;
  config: KyselyConfig;
  retryAttempts?: number;
  retryDelay?: number;

  extend?: <DB = any>(kysely: Kysely<DB>) => any;
}
