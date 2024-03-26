import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import * as nacos from 'nacos';

import { NACOS_NAMING_OPTIONS } from './nacos.constants';
import { NacosLogger } from './nacos.logger';
import {
  NacosNamingClient,
  NacosNamingClientOptions,
  NacosNamingInstance,
  NacosNamingInstanceOptions,
} from './nacos-naming.interface';

@Injectable()
export class NacosNamingService implements OnModuleInit, OnModuleDestroy {
  #client: NacosNamingClient;
  #logger = new NacosLogger('NacosNamingService');

  constructor(
    @Inject(NACOS_NAMING_OPTIONS)
    options?: NacosNamingClientOptions,
  ) {
    this.#client = new (nacos as any).NacosNamingClient({
      ...options,
      logger: this.#logger,
    });
  }

  async onModuleInit() {
    await this.#client.ready();
  }

  async onModuleDestroy() {
    await this.#client.close();
  }

  public get client() {
    return this.#client;
  }

  public registerInstance(
    serviceName: string,
    instance: NacosNamingInstanceOptions,
    group?: string,
  ) {
    this.#logger.log(`Register service instance: ${serviceName}`);
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
}
