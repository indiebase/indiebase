import { NacosConfigModule, NacosConfigService } from '@letscollab/nest-nacos';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InvitationController } from './invitation.controller';
import { InvitationService } from './invitation.service';
import { InvitationEntity } from './invitation.entity';
import { AUTH_RMQ, MAIL_RMQ, USER_RMQ } from '@letscollab/helper';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvitationEntity]),
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
  controllers: [InvitationController],
  providers: [InvitationService, Logger],
})
export class InvitationModule {}
