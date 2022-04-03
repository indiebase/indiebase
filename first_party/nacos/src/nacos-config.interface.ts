import { Type, DynamicModule, ForwardReference } from '@nestjs/common';
import { ClientOptions } from 'nacos';

export interface NacosConfigClientOptions extends ClientOptions {
  dataParser?: (data?: string, ...args: any[]) => any;
  [key: string]: any;
}

export interface NacosConfigClientAsyncOptions<T = NacosConfigClientOptions> {
  /**
   * Factory function that returns an instance of the provider to be injected.
   */
  useFactory: (...args: any[]) => T;

  inject?: any[];

  imports?: Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
}
