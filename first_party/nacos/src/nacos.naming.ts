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

import {
  App,
  Config,
  Init,
  Logger,
  Provide,
  Scope,
  ScopeEnum,
} from '@midwayjs/decorator';
import {
  NacosNamingClient,
  NacosNamingClientOptions,
  NacosNamingInstance,
  NacosNamingInstanceOptions,
} from './nacos.interface';
import { ILogger, IMidwayApplication } from '@midwayjs/core';
import * as nacos from 'nacos';

@Provide()
@Scope(ScopeEnum.Singleton)
export class NacosNamingService {
  @Config('nacosNaming')
  options: NacosNamingClientOptions;

  @App()
  app: IMidwayApplication;

  #client!: NacosNamingClient;

  @Logger('nacosNamingLogger')
  nacosLogger: ILogger;

  @Init()
  initService() {
    this.#client = new (nacos as any).NacosNamingClient({
      ...this.options,
      logger: this.nacosLogger,
    });
  }

  public registerInstance(
    serviceName: string,
    instance: NacosNamingInstanceOptions,
    group?: string,
  ) {
    this.nacosLogger.info(`Registe service instance: ${serviceName}`);
    return this.#client.registerInstance(
      serviceName,
      instance,
      group,
    ) as Promise<void>;
  }

  public deregisterInstance(
    serviceName: string,
    instance: NacosNamingInstanceOptions,
    group?: string,
  ) {
    return this.#client.deregisterInstance(
      serviceName,
      instance,
      group,
    ) as Promise<void>;
  }

  public getAllInstances(
    serviceName: string,
    group?: string,
    clusters?: string,
    subscribe?: boolean,
  ) {
    return this.#client.getAllInstances(
      serviceName,
      group,
      clusters,
      subscribe,
    ) as Promise<NacosNamingInstance[]>;
  }

  public selectInstances(
    serviceName: string,
    group?: string,
    clusters?: string,
    healthy?: boolean,
    subscribe?: boolean,
  ) {
    return this.#client.selectInstances(
      serviceName,
      group,
      clusters,
      healthy,
      subscribe,
    ) as Promise<NacosNamingInstance[]>;
  }

  public getServerStatus() {
    return this.#client.getServerStatus() as Promise<'UP' | 'DOWN'>;
  }

  public subscribe(
    info: string | { serviceName: string; group?: string; clusters?: string },
    listener: (instances: NacosNamingInstance[]) => void,
  ) {
    return this.#client.subscribe(info, listener);
  }

  public unSubscribe(
    info: string | { serviceName: string; group?: string; clusters?: string },
    listener: (instances: NacosNamingInstance[]) => void,
  ) {
    return this.#client.unSubscribe(info, listener);
  }

  public close() {
    return this.#client.close();
  }
}
