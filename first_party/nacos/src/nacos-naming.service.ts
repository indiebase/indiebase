import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { NacosNamingClient, NacosNamingClientOptions } from 'nacos';

@Injectable()
export class NacosNamingService implements OnModuleInit, OnModuleDestroy {
  #client: NacosNamingClient;
  #logger = new Logger('NacosNamingService');

  constructor(options?: NacosNamingClientOptions) {
    this.#client = new NacosNamingClient({
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
