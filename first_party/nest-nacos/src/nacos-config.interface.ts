import { DynamicModule, ForwardReference, Type } from '@nestjs/common';
import { ClientOptions } from 'nacos';

export interface DataParser {
  (data: string | string[], ...args: any[]): any;
}
export interface NacosConfigClientOptions extends ClientOptions {
  dataParser?: DataParser;
  observe?: boolean;
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
