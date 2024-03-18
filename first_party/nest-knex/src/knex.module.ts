import type { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';

import type { KnexAsyncOptions, KnexOptions } from './knex.interfaces';
import { KnexCoreModule } from './knex-core.module';

@Module({})
export class KnexModule {
  public static forRoot(
    options: KnexOptions,
    connection?: string,
  ): DynamicModule {
    return {
      module: KnexModule,
      imports: [KnexCoreModule.forRoot(options, connection)],
    };
  }

  public static forRootAsync(
    options: KnexAsyncOptions,
    connection?: string,
  ): DynamicModule {
    return {
      module: KnexModule,
      imports: [KnexCoreModule.forRootAsync(options, connection)],
    };
  }
}
