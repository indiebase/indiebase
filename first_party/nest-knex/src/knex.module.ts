import { DynamicModule, Module } from '@nestjs/common';
import { KnexCoreModule } from './knex-core.module';
import { KnexAsyncOptions, KnexOptions } from './knex.interfaces';

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
