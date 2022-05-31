import { UserEntity } from '@letscollab/user';
import { NacosConfigModule, NacosConfigService } from '@letscollab/nest-nacos';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntity } from './team.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_RMQ, USER_RMQ } from '../app.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamEntity, UserEntity]),
    ...[
      { name: AUTH_RMQ, q: 'auth_queue' },
      { name: USER_RMQ, q: 'user_queue' },
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
  controllers: [TeamController],
  providers: [TeamService, Logger],
})
export class TeamModule {}
