import { DynamicModule, Module } from '@nestjs/common';
import { KyselyCoreModule } from './kysely-core.module';
import { KyselyAsyncOptions, KyselyOptions } from './kysely.interfaces';

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
