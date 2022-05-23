import { NacosConfigModule, NacosConfigService } from '@letscollab/nest-nacos';
import { MailService } from './mail.service';
import { Module, Logger } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailController } from './mail.controller';
import { MAIL_RMQ_CONSUMER } from '../app.constants';
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: MAIL_RMQ_CONSUMER,
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
  controllers: [MailController],
  providers: [MailService, Logger],
})
export class MailModule {}
