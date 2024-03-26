import { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';

import { KyselyAsyncOptions, KyselyOptions } from './kysely.interfaces';
import { KyselyCoreModule } from './kysely-core.module';

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
      imports: [KyselyCoreModule.forRootAsync(options, connection)],
    };
  }
}
