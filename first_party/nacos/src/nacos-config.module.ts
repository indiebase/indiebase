import { NacosConfigService } from './nacos-config.service';
import { DynamicModule, Module } from '@nestjs/common';
import { ClientOptions } from 'nacos';
import {
  createNacosConfigClientProvider,
  createNacosConfigClientProviderAsync,
} from './nacos.provider';
import { NacosConfigClientAsyncOptions } from './nacos-config.interface';

@Module({})
export class NacosConfigModule {
  public static forRoot(options?: ClientOptions): DynamicModule {
    const provider = createNacosConfigClientProvider(options);
    return {
      module: NacosConfigModule,
      providers: [provider, NacosConfigService],
      exports: [NacosConfigService],
      global: true,
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
      global: true,
    };
  }
}
