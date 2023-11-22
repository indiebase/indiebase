import { DynamicModule, Global, Module } from '@nestjs/common';
import { CasbinService } from './casbin.service';
import {
  createCasbinProvider,
  createCasbinProviderAsync,
} from './casbin.provider';
import { CasbinOptions, CasbinAsyncOptions } from './casbin.interface';

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
