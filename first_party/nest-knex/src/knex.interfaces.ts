import type { ModuleMetadata, Type } from '@nestjs/common';
import { Knex } from 'knex';

export interface KnexAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  inject?: any[];
  useClass?: Type<KnexOptionsFactory>;
  useExisting?: Type<KnexOptionsFactory>;
  /**
   * Factory function that returns an instance of the provider to be injected.
   */
  useFactory?: (...args: any[]) => Promise<KnexOptions> | KnexOptions;
}

export interface KnexOptionsFactory {
  createKnexOptions(
    connectionName?: string,
  ): Promise<KnexOptions> | KnexOptions;
}

export interface KnexOptions {
  name?: string;
  config: Knex.Config;
  retryAttempts?: number;
  retryDelay?: number;
}
