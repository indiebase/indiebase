import { NacosConfigModule, NacosConfigService } from '@letscollab/nest-nacos';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_RMQ, MAIL_RMQ } from '@/app.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserRepository]),
    ...[
      { name: AUTH_RMQ, q: 'auth_queue' },
      { name: MAIL_RMQ, q: 'mail_queue' },
    ].map((v) => {
      return ClientsModule.registerAsync([
        {
          name: v.name,
          imports: [NacosConfigModule],
          inject: [NacosConfigService],
          async useFactory(nacosConfigService: NacosConfigService) {
            const nacosConfigs = await nacosConfigService.getConfig(
              'service-auth.json',
            );
            return {
              transport: Transport.RMQ,
              options: {
                urls: nacosConfigs.rabbitmq.urls,
                queue: 'auth_queue',
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
  providers: [UserService],
})
export class UserModule {}
