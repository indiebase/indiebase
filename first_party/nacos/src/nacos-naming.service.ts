import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
  Inject,
} from '@nestjs/common';
import * as nacos from 'nacos';
import type {
  NacosNamingClient,
  NacosNamingClientOptions,
} from './nacos-naming.interface';
import { NACOS_NAMING_OPTIONS } from './nacos.constants';
import { NacosLogger } from './nacos.logger';

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
    await (this.#client as any).close();
  }

  public get client() {
    return this.#client;
  }
}
