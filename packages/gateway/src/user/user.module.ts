import { NacosConfigModule, NacosConfigService } from '@letscollab-nest/nacos';
import { UserController } from './user.controller';
import { Logger, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RoleController } from './role/role.controller';
import { ResourceController } from './res/resource.controller';
import { AUTH_RMQ, MAIL_RMQ } from '@letscollab-nest/helper';

@Module({
  imports: [
    ...[
      { name: AUTH_RMQ, q: 'auth_queue' },
      { name: MAIL_RMQ, q: 'msg_queue' },
    ].map((v) => {
      return ClientsModule.registerAsync([
        {
          name: v.name,
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
                queue: v.q,
                queueOptions: {
                  durable: false,
                },
              },
            };
          },
        },
      ]);
    }),
  ],
  controllers: [UserController, RoleController, ResourceController],
  providers: [Logger],
})
export class UserModule {}
