import { NacosConfigModule, NacosConfigService } from '@letscollab/nest-nacos';
import { MailService } from './mail.service';
import { Module, Logger } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailController } from './mail.controller';
import { MAIL_RMQ_CONSUMER } from '../app.constants';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
@Module({
  imports: [
    // WinstonModule.forRootAsync({
    //   inject: [NacosConfigService],
    //   useFactory: async (config: NacosConfigService) => {
    //     const configs = await config.getConfig('service-auth.json');
    //     const logStorageDir = configs.logger.storageDir
    //       ? configs.logger.storageDir
    //       : '/var/log';

    //     const transports: any[] = [
    //       new winston.transports.Console({
    //         format: winston.format.combine(
    //           winston.format.timestamp(),
    //           utilities.format.nestLike(),
    //         ),
    //       }),
    //     ];
    //     if (isProduction) {
    //       transports.push(
    //         new DailyRotateFile({
    //           filename: resolve(logStorageDir, 'combined-%DATE%.log'),
    //           datePattern: 'YYYY-MM-DD-HH',
    //           zippedArchive: true,
    //           level: 'warn',
    //           maxSize: '20m',
    //           maxFiles: '14d',
    //         }),
    //         // new winston.transports.File({
    //         //   filename: 'combined.log',
    //         //   level: 'warn',
    //         //   format: winston.format.json(),
    //         // }),
    //       );
    //     }

    //     return {
    //       level: isDevelopment ? 'debug' : 'warn',
    //       format: winston.format.json(),
    //       defaultMeta: { service: 'auth' },
    //       exitOnError: false,
    //       rejectionHandlers: isProduction
    //         ? [
    //             new DailyRotateFile({
    //               filename: resolve(logStorageDir, 'rejections-%DATE%.log'),
    //               datePattern: 'YYYY-MM-DD-HH',
    //               zippedArchive: true,
    //               level: 'warn',
    //               maxSize: '20m',
    //               maxFiles: '14d',
    //             }),
    //           ]
    //         : null,
    //       transports,
    //     };
    //   },
    // }),
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
