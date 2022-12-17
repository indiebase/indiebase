import { NacosConfigModule, NacosConfigService } from '@letscollab-nest/nacos';
import { PrjService } from './prj.service';
import { PrjController } from './prj.controller';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrjEntity } from './prj.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_RMQ, MAIL_RMQ } from '@letscollab-nest/helper';

@Module({
  imports: [
    TypeOrmModule.forFeature([PrjEntity]),
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
  controllers: [PrjController],
  providers: [PrjService, Logger],
})
export class PrjModule {}
