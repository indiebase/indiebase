/**
 * Copyright 2022 WangHan
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { ClientOptions } from 'nacos';

export interface DataParser {
  (data: string | string[], ...args: any[]): any;
}
export interface NacosConfigClientOptions extends ClientOptions {
  dataParser?: DataParser;
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
  new (options?: NacosNamingClientOptions);

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
