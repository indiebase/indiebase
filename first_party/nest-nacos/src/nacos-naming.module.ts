import { DynamicModule } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';

import {
  createNacosNamingClientAsyncProvider,
  createNacosNamingClientProvider,
} from './nacos.provider';
import {
  NacosNamingClientAsyncOptions,
  NacosNamingClientOptions,
} from './nacos-naming.interface';
import { NacosNamingService } from './nacos-naming.service';

@Module({})
@Global()
export class NacosNamingModule {
  public static forRoot(options?: NacosNamingClientOptions): DynamicModule {
    const provider = createNacosNamingClientProvider(options);
    return {
      module: NacosNamingModule,
      providers: [provider, NacosNamingService],
      exports: [NacosNamingService],
    };
  }

  public static forRootAsync(
    options?: NacosNamingClientAsyncOptions,
  ): DynamicModule {
    options = options!;
    const provider = createNacosNamingClientAsyncProvider(options);

    return {
      module: NacosNamingModule,
      providers: [provider, NacosNamingService],
      exports: [NacosNamingService],
      imports: options.imports ?? [],
    };
  }
}
