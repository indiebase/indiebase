import { NacosConfigService } from './nacos-config.service';
import { DynamicModule, Global, Module } from '@nestjs/common';

import {
  createNacosConfigClientProvider,
  createNacosConfigClientProviderAsync,
} from './nacos.provider';
import {
  NacosConfigClientAsyncOptions,
  NacosConfigClientOptions,
} from './nacos-config.interface';

@Module({})
@Global()
export class NacosConfigModule {
  public static forRoot(options?: NacosConfigClientOptions): DynamicModule {
    const provider = createNacosConfigClientProvider(options);
    return {
      module: NacosConfigModule,
      providers: [provider, NacosConfigService],
      exports: [NacosConfigService],
    };
  }

  public static forRootAsync(
    options?: NacosConfigClientAsyncOptions,
  ): DynamicModule {
    const provider = createNacosConfigClientProviderAsync(options);
    return {
      module: NacosConfigModule,
      providers: [provider, NacosConfigService],
      exports: [NacosConfigService],
      imports: options.imports ?? [],
    };
  }
}
