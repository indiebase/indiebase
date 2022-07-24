import { RoleEntity } from './role/role.entity';
import { RoleService } from './role/role.service';
import { TeamEntity } from '@letscollab/collab';
import { NacosConfigModule, NacosConfigService } from '@letscollab/nest-nacos';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_RMQ, MAIL_RMQ } from '../app.constants';
import { RoleController } from './role/role.controller';
import { ResourceController } from './res/resource.controller';
import { IsUserExistedConstraint } from 'src/utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TeamEntity, RoleEntity]),
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
  providers: [UserService, Logger, RoleService, IsUserExistedConstraint],
})
export class UserModule {}
