import { NacosConfigService } from './nacos-config.service';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ClientOptions } from 'nacos';
import {
  createNacosConfigClientProvider,
  createNacosConfigClientProviderAsync,
} from './nacos.provider';

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
    options?: ClientOptions & Provider,
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
