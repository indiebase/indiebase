/**
 * Copyright (c) 2022 Nawbc
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { NacosConfigService } from '@letscollab/midway-nacos';
import { ILogger, IMidwayLogger } from '@midwayjs/core';
import {
  Body,
  Controller,
  Get,
  OBJ_DEF_CLS,
  Param,
  Provide,
  Inject,
  Logger,
} from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';
import { DemoService } from './demo.service';

// import second from 'typeorm';

@Provide()
@Controller()
export class UserController {
  // @Logger('dash')
  // logger: ILogger;

  @Inject()
  nacosConfigService: NacosConfigService;

  @Logger()
  logger: ILogger;

  // @Inject()
  // jwt: JwtService;

  @Inject()
  demoService: DemoService;

  @Get('/register')
  async register(@Body() body) {
    // this.userService.
    // console.log(this.jwt);
    console.log(
      Reflect.getMetadata(OBJ_DEF_CLS, UserController),
      '=========================',
      this.nacosConfigService,
    );

    return 'demo';
  }

  @Get('/login')
  async login(@Body() body, @Param('id') id) {
    console.log('======================');
    this.logger.info('=========================');
    return 'demo';
  }
}
