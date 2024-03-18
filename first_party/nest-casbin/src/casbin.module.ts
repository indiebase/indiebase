import type { DynamicModule} from '@nestjs/common';
import { Global, Module } from '@nestjs/common';

import type { CasbinAsyncOptions,CasbinOptions } from './casbin.interface';
import {
  createCasbinProvider,
  createCasbinProviderAsync,
} from './casbin.provider';
import { CasbinService } from './casbin.service';

@Module({})
@Global()
export class CasbinModule {
  public static forRoot(options?: CasbinOptions): DynamicModule {
    const provider = createCasbinProvider(options);
    return {
      module: CasbinModule,
      providers: [provider, CasbinService],
      exports: [CasbinService],
      imports: options.imports ?? [],
    };
  }

  public static forRootAsync(options?: CasbinAsyncOptions): DynamicModule {
    const provider = createCasbinProviderAsync(options);

    return {
      module: CasbinModule,
      providers: [provider, CasbinService],
      exports: [CasbinService],
      imports: options.imports ?? [],
    };
  }
}
