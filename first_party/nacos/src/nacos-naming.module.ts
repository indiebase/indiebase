import { DynamicModule, Module } from '@nestjs/common';
import { NacosNamingService } from './nacos-naming.service';
import { createNacosNamingClientProvider } from './nacos.provider';
import type { NacosNamingClientOptions } from 'nacos';

@Module({})
export class NacosNamingModule {
  public static forRoot(options?: NacosNamingClientOptions): DynamicModule {
    const privuder = createNacosNamingClientProvider(options);
    return {
      module: NacosNamingModule,
      providers: [NacosNamingService],
      exports: [NacosNamingService],
    };
  }

  public static forRootAsync(options): DynamicModule {
    return {
      module: NacosNamingModule,
      imports: [NacosNamingService],
      exports: [NacosNamingService],
    };
  }
}
