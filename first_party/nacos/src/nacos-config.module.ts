import { NacosConfigService } from './nacos-config.service';
import { DynamicModule, Module } from '@nestjs/common';
import { ClientOptions } from 'nacos';
import { createNacosConfigClientProvider } from './nacos.provider';

@Module({})
export class NacosConfigModule {
  public static forRoot(options?: ClientOptions): DynamicModule {
    const provider = createNacosConfigClientProvider(options);
    return {
      module: NacosConfigModule,
      providers: [NacosConfigService, provider],
      exports: [NacosConfigService],
      global: true,
    };
  }

  public static forRootAsync(options): DynamicModule {
    return {
      module: NacosConfigModule,
      imports: [NacosConfigService],
      exports: [NacosConfigService],
    };
  }
}
