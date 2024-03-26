import { DynamicModule, ForwardReference, Type } from '@nestjs/common';
import Base from 'sdk-base';

export interface NacosNamingClientOptions {
  logger?: any;
  namespace?: string;
  /**
   * @example
   * ```
   *  '127.0.0.1,127.0.0.2', ['127.0.0.1', '127.0.0.2']
   * ```
   */
  serverList?: string[] | string;

  httpclient?: any;
  ssl?: boolean;
  ak?: string;
  sk?: string;
  appName?: string;
  endpoint?: string;
  vipSrvRefInterMillis?: number;
}
export interface NacosNamingClientAsyncOptions<T = NacosNamingClientOptions> {
  /**
   * Factory function that returns an instance of the provider to be injected.
   */
  useFactory: (...args: any[]) => T;

  inject?: any[];

  imports?: Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
}

export interface NacosNamingInstance {
  instanceId: string;
  clusterName: string;
  serviceName: string;
  ip: string;
  port: number;
  weight: number;
  ephemeral: boolean;
  enabled: boolean;
  valid: boolean;
  marked: boolean;
  healthy: boolean;
  metadata: any;
}

export interface NacosNamingInstanceOptions {
  instanceId?: string;
  clusterName?: string;
  serviceName?: string;
  ip?: string;
  port?: number;
  weight?: number;
  ephemeral?: boolean;
  enabled?: boolean;
  valid?: boolean;
  marked?: boolean;
  healthy?: boolean;
  metadata?: any;
}

export interface NacosNamingClient extends Base {
  new (options?: NacosNamingClientOptions): this;

  registerInstance(
    serviceName: string,
    instance: NacosNamingInstanceOptions,
    group?: string,
  ): Promise<void>;

  deregisterInstance(
    serviceName: string,
    instance: NacosNamingInstanceOptions,
    group?: string,
  ): Promise<void>;

  getAllInstances(
    serviceName: string,

    group?: string,
    clusters?: string,
    subscribe?: boolean,
  ): Promise<[]>;

  selectInstances(
    serviceName: string,
    group?: string,
    clusters?: string,
    healthy?: boolean,
    subscribe?: boolean,
  ): Promise<[]>;

  getServerStatus(): Promise<'UP' | 'DOWN'>;

  subscribe(
    service:
      | string
      | { serviceName: string; group?: string; clusters?: string },
    listener?: (...args: any) => void,
  ): void;

  unSubscribe(
    service:
      | string
      | { serviceName: string; group?: string; clusters?: string },
    listener?: (...args: any) => void,
  ): void;

  close(): void;
}
