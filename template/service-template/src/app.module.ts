import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { resolve } from 'path';
import configure from './config';
import { NacosConfigModule, NacosConfigService } from '@letscollab/nest-nacos';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
      isGlobal: true,
      load: configure,
    }),

    WinstonModule.forRootAsync({
      inject: [NacosConfigService],
      useFactory: async (config: NacosConfigService) => {
        const configs = await config.getConfig('service-auth.json');
        const logStorageDir = configs.logger.storageDir
          ? configs.logger.storageDir
          : '/var/log';

        const transports: any[] = [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              utilities.format.nestLike(),
            ),
          }),
        ];
        if (isProduction) {
          transports.push(
            new DailyRotateFile({
              filename: resolve(logStorageDir, 'combined-%DATE%.log'),
              datePattern: 'YYYY-MM-DD-HH',
              zippedArchive: true,
              level: 'warn',
              maxSize: '20m',
              maxFiles: '14d',
            }),
            // new winston.transports.File({
            //   filename: 'combined.log',
            //   level: 'warn',
            //   format: winston.format.json(),
            // }),
          );
        }

        return {
          level: isDevelopment ? 'debug' : 'warn',
          format: winston.format.json(),
          defaultMeta: { service: 'auth' },
          exitOnError: false,
          rejectionHandlers: isProduction
            ? [
                new DailyRotateFile({
                  filename: resolve(logStorageDir, 'rejections-%DATE%.log'),
                  datePattern: 'YYYY-MM-DD-HH',
                  zippedArchive: true,
                  level: 'warn',
                  maxSize: '20m',
                  maxFiles: '14d',
                }),
              ]
            : null,
          transports,
        };
      },
    }),
    // NacosNamingModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory(config: ConfigService) {
    //     return {
    //       serverList: config.get('nacos.serverList'),
    //       namespace: config.get('nacos.namespace'),
    //     };
    //   },
    // }),
    NacosConfigModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          serverAddr: config.get('nacos.serverList'),
          namespace: config.get('nacos.namespace'),
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [Logger],
})
export class AppModule {}
