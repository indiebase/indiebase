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

import { Config, Init, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { NacosConfigClient } from 'nacos';
import { DataParser, NacosConfigClientOptions } from './nacos.interface';
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

  #parser!: DataParser;

  #DEFAULT_GROUP: string = 'DEFAULT_GROUP';

  @Init()
  initService() {
    this.#client = new NacosConfigClient(this.options);
    this.#parser = this.options.dataParser ?? this.jsonParser;
    this.#DEFAULT_GROUP = 'DEFAULT_GROUP';
  }

  public get client(): NacosConfigClient {
    return this.#client;
  }

  private jsonParser(data: string, options?: StripJsonCommentsOptions) {
    return JSON.parse(stripJsonComments(data, options));
  }

  public setDataParser(parser: DataParser) {
    this.#parser = parser;
    return this;
  }

  public async getConfig<T = any>(
    dataId: any,
    group = this.#DEFAULT_GROUP,
    options?: any,
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
    dataIds: string[],
    group = this.#DEFAULT_GROUP,
    options?: Options,
  ): Promise<{}> {
    return this.#client.batchGetConfig(dataIds, group, options);
  }

  public async batchQuery(
    dataIds: string[],
    group = this.#DEFAULT_GROUP,
    options?: Options,
  ): Promise<{}> {
    return this.#client.batchQuery(dataIds, group, options);
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
