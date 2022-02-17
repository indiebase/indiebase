import { Type, DynamicModule, ForwardReference } from '@nestjs/common';
import { ClientOptions } from 'nacos';

export interface NacosConfigClientAsyncOptions<T = ClientOptions> {
  /**
   * Factory function that returns an instance of the provider to be injected.
   */
  useFactory: (...args: any[]) => T;

  inject?: any[];

  imports?: Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
}

export type NacosConfigClientOptions = ClientOptions;
