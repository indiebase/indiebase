import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { NacosConfigClient, ClientOptions } from 'nacos';

@Injectable()
export class NacosConfigService implements OnModuleInit, OnModuleDestroy {
  #client: NacosConfigClient;
  #logger = new Logger('NacosConfigService');

  constructor(options?: ClientOptions) {
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
