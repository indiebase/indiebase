import { UserEntity } from './model/user.entity';
/**
 * Copyright (c) 2022 Nawbc
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Config, Init, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
// import {
//   ClientOptions as NacosConfigClientOptions,
//   NacosConfigClient,
// } from 'nacos';

@Provide()
@Scope(ScopeEnum.Singleton)
export class UserService {
  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;
  // @Config('nacosConfig')
  // options: NacosConfigClientOptions;

  // client: NacosConfigClient;

  // @Init()
  // initService() {
  //   this.client = new NacosConfigClient(this.options);
  // }

  public get client1() {
    return '111';
  }
}
