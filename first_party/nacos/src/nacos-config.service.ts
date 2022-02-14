import { NACOS_CONFIG_OPTIONS } from './nacos.constants';
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { NacosConfigClient, ClientOptions } from 'nacos';

@Injectable()
export class NacosConfigService implements OnModuleInit, OnModuleDestroy {
  #client: NacosConfigClient;

  constructor(
    @Inject(NACOS_CONFIG_OPTIONS)
    options?: ClientOptions,
  ) {
    this.#client = new NacosConfigClient({
      ...options,
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
