import { ModuleMetadata, Type } from '@nestjs/common';
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
  /**
   * Indicates if database schema should be auto created on every application launch.
   * Be careful with this option and don't use this in production
   *
   * If set to true, it will provide a global environment variable `globalThis[Symbol.for('__KNEX_SYNCHRONIZE__')] = true`,
   * which can be used for extending.
   *
   * @example
   * ```ts
   * import {KNEX_SYNC} from '@indiebase/nest-knex'
   *
   * if(globalThis[KNEX_SYNC]){}
   * ```
   *
   */
  synchronize?: boolean;

  extend?: (knex: Knex) => any;
}
