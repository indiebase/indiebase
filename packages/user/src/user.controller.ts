import { CasbinService } from '@letscollab/midway-casbin';
import { MidwayCasbinConfigs } from '@letscollab/midway-casbin/src/casbin.interface';
import { NacosConfig, NacosConfigService } from '@letscollab/midway-nacos';
import { ILogger } from '@midwayjs/core';
import {
  Body,
  Controller,
  Get,
  Param,
  Provide,
  Inject,
  Logger,
  Config,
} from '@midwayjs/decorator';
import { RabbitMQProvider } from './user.provider';
import { UserService } from './user.service';

// import second from 'typeorm';

@Provide()
@Controller()
export class UserController {
  @Inject()
  rabbitMQProvider: RabbitMQProvider;

  @Get('/login')
  async login(@Body() body, @Param('id') id) {
    console.log('demo');
    await this.rabbitMQProvider.sendToQueue('tasks', { name: 'demo' });
    return 'demo';
  }
}
