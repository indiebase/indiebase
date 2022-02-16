import { ClientOptions } from 'nacos';

export interface NacosConfigClientAsyncOptions<T = ClientOptions> {
  /**
   * Factory function that returns an instance of the provider to be injected.
   */
  useFactory: (...args: any[]) => T;

  inject?: any[];
}

export type NacosConfigClientOptions = ClientOptions;
