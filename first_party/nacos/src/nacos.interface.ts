import type { ClientOptions } from 'nacos';

export interface NacosConfigClientOptions extends ClientOptions {
  dataParser?: (data?: string, ...args: any[]) => any;
  [key: string]: any;
}

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
  new (options?: NacosNamingClientOptions);

  registerInstance(
    serviceName: string,
    instance: NacosNamingInstanceOptions,
    groupName?: string,
  ): Promise<void>;

  deregisterInstance(
    serviceName: string,
    instance: NacosNamingInstanceOptions,
    groupName?: string,
  ): Promise<void>;

  getAllInstances(
    serviceName: string,
    instance?: NacosNamingInstanceOptions,
    groupName?: string,
    clusters?: string,
    subscribe?: boolean,
  ): Promise<[]>;

  selectInstances(
    serviceName: string,
    instance?: NacosNamingInstanceOptions,
    groupName?: string,
    clusters?: string,
    subscribe?: boolean,
  ): Promise<[]>;

  getServerStatus(): Promise<'UP' | 'DOWN'>;

  subscribe(serviceName: string, listener?: (...args: any) => void): void;

  unSubscribe(serviceName: string, listener?: (...args: any) => void): void;
}
