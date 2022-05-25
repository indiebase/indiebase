import { Logger, Module } from '@nestjs/common';
import { NacosConfigModule, NacosConfigService } from '@letscollab/nest-nacos';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_RMQ } from '../app.constants';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: USER_RMQ,
        imports: [NacosConfigModule],
        inject: [NacosConfigService],
        async useFactory(nacosConfigService: NacosConfigService) {
          const nacosConfigs = await nacosConfigService.getConfig(
            'service-user.json',
          );

          return {
            transport: Transport.RMQ,
            options: {
              urls: nacosConfigs.rabbitmq.urls,
              queue: 'user_queue',
              queueOptions: {
                durable: false,
              },
            },
          };
        },
      },
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService, Logger],
  exports: [RoleService],
})
export class RbacModule {}
