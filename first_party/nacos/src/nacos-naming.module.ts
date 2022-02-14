import { DynamicModule, Module } from '@nestjs/common';
import { NacosNamingService } from './nacos-naming.service';
import { createNacosNamingClientProvider } from './nacos.provider';
import { NacosNamingClientOptions } from './nacos-naming.interface';

@Module({})
export class NacosNamingModule {
  public static forRoot(options?: NacosNamingClientOptions): DynamicModule {
    const provider = createNacosNamingClientProvider(options);
    return {
      module: NacosNamingModule,
      providers: [NacosNamingService, provider],
      exports: [NacosNamingService],
      global: true,
    };
  }

  public static forRootAsync(options: NacosNamingClientOptions): DynamicModule {
    return {
      module: NacosNamingModule,
      imports: [NacosNamingService],
      exports: [NacosNamingService],
      global: true,
    };
  }
}
