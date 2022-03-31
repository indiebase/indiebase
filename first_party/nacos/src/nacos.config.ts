/**
 * Copyright (c) 2022 Nawbc
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Config, Init, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { NacosConfigClient } from 'nacos';
import { NacosConfigClientOptions } from './nacos.interface';
import stripJsonComments, {
  StripJsonCommentsOptions,
} from './strip-json-comments';

export interface SubOptions {
  dataId: string;
  group: string;
  unit?: string;
}

export interface Options {
  unit?: string;
}

@Provide()
@Scope(ScopeEnum.Singleton)
export class NacosConfigService {
  @Config('nacosConfig')
  options: NacosConfigClientOptions;

  #client!: NacosConfigClient;

  #parser!: (data: string | string[], ...args: any[]) => any;

  #DEFAULT_GROUP: string = 'DEFAULT_GROUP';

  @Init()
  initService() {
    this.#client = new NacosConfigClient(this.options);
    this.#parser = this.options.dataParser ?? this.#jsonParser;
    this.#DEFAULT_GROUP = 'DEFAULT_GROUP';
  }

  public get client(): NacosConfigClient {
    return this.#client;
  }

  #jsonParser(data: string, options?: StripJsonCommentsOptions) {
    return JSON.parse(stripJsonComments(data, options));
  }

  public async getConfig<T = any>(
    dataId: string,
    group: any = this.#DEFAULT_GROUP,
    options?: Options,
  ): Promise<{} & T> {
    const data = await this.#client.getConfig(dataId, group, options);
    return this.#parser(data);
  }

  public async publishSingle(
    dataId: string,
    content: string,
    group: any = this.#DEFAULT_GROUP,
    options?: Options,
  ): Promise<boolean> {
    return this.#client.publishSingle(dataId, group, content, options);
  }

  public async publishToAllUnit(
    dataId: string,
    content: string,
    group: any = this.#DEFAULT_GROUP,
  ): Promise<boolean> {
    return this.#client.publishToAllUnit(dataId, group, content);
  }

  public async removeToAllUnit(
    dataId: string,
    group: any = this.#DEFAULT_GROUP,
  ): Promise<boolean> {
    return this.#client.removeToAllUnit(dataId, group);
  }

  public async batchGetConfig(
    dataId: string,
    group: any = this.#DEFAULT_GROUP,
    options?: Options,
  ): Promise<{}> {
    return this.#client.batchGetConfig(dataId, group, options);
  }

  public async batchQuery(
    dataId: string,
    group: any = this.#DEFAULT_GROUP,
    options?: Options,
  ): Promise<{}> {
    return this.#client.batchQuery(dataId, group, options);
  }

  public async remove(
    dataId: string,
    group: any = this.#DEFAULT_GROUP,
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
    group: any = this.#DEFAULT_GROUP,
    options?: Options,
  ): Promise<boolean> {
    return this.#client.publishAggr(dataId, group, datumId, content, options);
  }

  public async removeAggr(
    dataId: string,
    datumId: string,
    group: any = this.#DEFAULT_GROUP,
    options?: Options,
  ): Promise<boolean> {
    return this.#client.removeAggr(dataId, group, datumId, options);
  }

  public async close(): Promise<void> {
    this.#client.close();
  }
}
