import { TeamEntity } from '@letscollab/collab';
import { NacosConfigModule, NacosConfigService } from '@letscollab/nest-nacos';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_RMQ, MAIL_RMQ } from '../app.constants';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserRepository, TeamEntity]),
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
  controllers: [UserController],
  providers: [UserService, Logger],
})
export class UserModule {}
