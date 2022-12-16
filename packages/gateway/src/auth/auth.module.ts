import { Logger, Module } from '@nestjs/common';
import { PassportModule } from '@letscollab-nest/fastify-passport';
import { NacosConfigModule, NacosConfigService } from '@letscollab-nest/nacos';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { USER_RMQ } from '@letscollab/helper';

@Module({
  imports: [
    PassportModule.register({ session: true }),
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
  controllers: [AuthController],
  providers: [Logger],
  exports: [PassportModule],
})
export class AuthModule {}
