import { DynamicModule } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';

import {
  createNacosConfigClientAsyncProvider,
  createNacosConfigClientProvider,
} from './nacos.provider';
import {
  NacosConfigClientAsyncOptions,
  NacosConfigClientOptions,
} from './nacos-config.interface';
import { NacosConfigService } from './nacos-config.service';

@Module({})
@Global()
export class NacosConfigModule {
  public static forRoot(options?: NacosConfigClientOptions): DynamicModule {
    options = options!;
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
    options = options!;
    const provider = createNacosConfigClientAsyncProvider(options);
    return {
      module: NacosConfigModule,
      providers: [provider, NacosConfigService],
      exports: [NacosConfigService],
      imports: options.imports ?? [],
    };
  }
}
