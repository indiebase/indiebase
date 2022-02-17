import { DynamicModule, Global, Module } from '@nestjs/common';
import { NacosNamingService } from './nacos-naming.service';
import {
  createNacosNamingClientProvider,
  createNacosNamingClientProviderAsync,
} from './nacos.provider';
import {
  NacosNamingClientOptions,
  NacosNamingClientAsyncOptions,
} from './nacos-naming.interface';

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
    const provider = createNacosNamingClientProviderAsync(options);

    return {
      module: NacosNamingModule,
      providers: [provider, NacosNamingService],
      exports: [NacosNamingService],
      imports: options.imports ?? [],
    };
  }
}
