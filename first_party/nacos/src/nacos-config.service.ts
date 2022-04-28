import { NACOS_CONFIG_OPTIONS } from './nacos.constants';
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { NacosConfigClient } from 'nacos';
import * as stripJsonComments from 'strip-json-comments';
import { DataParser, NacosConfigClientOptions } from './nacos-config.interface';
export interface SubOptions {
  dataId: string;
  group: string;
  unit?: string;
}

export interface Options {
  unit?: string;
}

export interface StripJsonCommentsOptions {
  /**
	Replace comments with whitespace instead of stripping them entirely.

	@default true
	*/
  readonly whitespace?: boolean;
}

@Injectable()
export class NacosConfigService implements OnModuleInit, OnModuleDestroy {
  #client: NacosConfigClient;

  #parser!: DataParser;

  #DEFAULT_GROUP = 'DEFAULT_GROUP';

  constructor(
    @Inject(NACOS_CONFIG_OPTIONS)
    options?: NacosConfigClientOptions,
  ) {
    this.#client = new NacosConfigClient({
      ...options,
    });

    this.#parser = options.dataParser ?? this.#jsonParser;
  }

  async onModuleInit() {
    await this.#client.ready();
  }

  async onModuleDestroy() {
    if (this.#client) {
      await this.#client.close();
      this.#client = null;
    }
  }

  public get client() {
    return this.#client;
  }

  #jsonParser(data: string, options?: StripJsonCommentsOptions) {
    return JSON.parse(stripJsonComments(data, options));
  }

  public setDataParser(parser: DataParser) {
    this.#parser = parser;
    return this;
  }

  public async getConfig<T = any>(
    dataId: string,
    group = this.#DEFAULT_GROUP,
    options?: Options,
  ): Promise<T> {
    const data = await this.#client.getConfig(dataId, group, options);
    return this.#parser(data);
  }

  public async publishSingle(
    dataId: string,
    content: string,
    group = this.#DEFAULT_GROUP,
    options?: Options,
  ): Promise<boolean> {
    return this.#client.publishSingle(dataId, group, content, options);
  }

  public async publishToAllUnit(
    dataId: string,
    content: string,
    group = this.#DEFAULT_GROUP,
  ): Promise<boolean> {
    return this.#client.publishToAllUnit(dataId, group, content);
  }

  public async removeToAllUnit(
    dataId: string,
    group = this.#DEFAULT_GROUP,
  ): Promise<boolean> {
    return this.#client.removeToAllUnit(dataId, group);
  }

  public async batchGetConfig(
    dataId: string,
    group = this.#DEFAULT_GROUP,
    options?: Options,
  ): Promise<Record<string, any>> {
    return this.#client.batchGetConfig(dataId, group, options);
  }

  public async batchQuery(
    dataId: string,
    group = this.#DEFAULT_GROUP,
    options?: Options,
  ): Promise<Record<string, any>> {
    return this.#client.batchQuery(dataId, group, options);
  }

  public async remove(
    dataId: string,
    group = this.#DEFAULT_GROUP,
    options?: Options,
  ): Promise<boolean> {
    return this.#client.remove(dataId, group, options);
  }

  public async subscribe(
    reg: SubOptions,
    listener: (d: any) => any,
  ): Promise<NacosConfigClient> {
    return this.#client.subscribe(reg, listener);
  }

  public async unSubscribe(
    reg: SubOptions,
    listener: (d: any) => any,
  ): Promise<NacosConfigClient> {
    return this.#client.unSubscribe(reg, listener);
  }

  public async getCurrentUnit(): Promise<string> {
    return this.#client.getCurrentUnit();
  }

  public async getAllUnits(): Promise<string[]> {
    return this.#client.getAllUnits();
  }

  public async publishAggr(
    dataId: string,
    datumId: string,
    content: string,
    group = this.#DEFAULT_GROUP,
    options?: Options,
  ): Promise<boolean> {
    return this.#client.publishAggr(dataId, group, datumId, content, options);
  }

  public async removeAggr(
    dataId: string,
    datumId: string,
    group = this.#DEFAULT_GROUP,
    options?: Options,
  ): Promise<boolean> {
    return this.#client.removeAggr(dataId, group, datumId, options);
  }

  public async close(): Promise<void> {
    this.#client.close();
  }
}
