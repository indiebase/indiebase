import { NACOS_CONFIG_OPTIONS } from './nacos.constants';
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { NacosConfigClient, ClientOptions } from 'nacos';
import * as stripJsonComments from 'strip-json-comments';

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
    if (this.#client) {
      await (this.#client as any).close();
      this.#client = null;
    }
  }

  private jsonParser(data: string) {
    return JSON.parse(stripJsonComments(data));
  }

  public get client() {
    return this.#client;
  }

  public async getConfig(
    dataId,
    group = 'DEFAULT_GROUP',
    options?: Record<string, any>,
    parser = this.jsonParser,
  ) {
    return parser(await this.#client.getConfig(dataId, group, options));
  }

  public async getConfigs(parser = this.jsonParser) {
    return (await this.#client.getConfigs()).map((val) => parser(val));
  }
}
