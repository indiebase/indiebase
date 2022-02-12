import { DynamicModule, Module } from '@nestjs/common';
import { NacosNamingService } from './nacos-naming.service';
import {
  createNacosConfigClientProvider,
  createNacosNamingClientProvider,
} from './nacos.provider';
import type { NacosNamingClientOptions } from 'nacos';

@Module({})
export class NacosModule {
  public static registerNamingClient(
    options?: NacosNamingClientOptions,
  ): DynamicModule {
    const privuder = createNacosNamingClientProvider(options);
    return {
      module: NacosModule,
      providers: [NacosNamingService],
      exports: [NacosNamingService],
    };
  }

  public static registerNamingClientAsync(options): DynamicModule {
    return {
      module: NacosModule,
      imports: [NacosNamingService],
      exports: [NacosNamingService],
    };
  }

  public static registerConfigClient(options): DynamicModule {
    return {
      module: NacosModule,
      providers: [],
      exports: [NacosModule],
    };
  }

  public static registerConfigClientAsync(options): DynamicModule {
    return {
      module: NacosModule,
      imports: [],
      exports: [],
    };
  }
}
