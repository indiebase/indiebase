// import { UserEntity } from '@letscollab/user';
import { NacosConfigModule, NacosConfigService } from '@letscollab-nest/nacos';
import { OrgController } from './org.controller';
import { Logger, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_RMQ, USER_RMQ, MAIL_RMQ } from '@letscollab-nest/helper';

@Module({
  imports: [
    ...[
      { name: AUTH_RMQ, q: 'auth_queue' },
      { name: USER_RMQ, q: 'user_queue' },
      { name: MAIL_RMQ, q: 'msg_queue' },
    ].map((v) => {
      return ClientsModule.registerAsync([
        {
          name: v.name,
          imports: [NacosConfigModule],
          inject: [NacosConfigService],
          async useFactory(nacosConfigService: NacosConfigService) {
            const nacosConfigs = await nacosConfigService.getConfig(
              'service-collab.json',
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
  controllers: [OrgController],
  providers: [Logger],
})
export class OrgModule {}
