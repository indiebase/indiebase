import { JwtModule } from '@nestjs/jwt';
import { Module, OnModuleInit, SetMetadata } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { resolve } from 'path';
import configure from './config';
import { AuthZModule, AUTHZ_ENFORCER } from 'nest-authz';
import TypeORMAdapter from 'typeorm-adapter';
import { NacosConfigModule, NacosConfigService } from '@letscollab/nest-nacos';
import * as casbin from 'casbin';
import { WinstonModule, utilities } from 'nest-winston';
import { AuthModule } from './auth/auth.module';
import * as winston from 'winston';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
      isGlobal: true,
      load: configure,
    }),
    WinstonModule.forRootAsync({
      useFactory: () => {
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
            new winston.transports.File({
              filename: 'combined.log',
              level: 'warn',
              format: winston.format.json(),
            }),
          );
        }

        return {
          level: isDevelopment ? 'debug' : 'warn',
          format: winston.format.json(),
          defaultMeta: { service: 'auth' },
          exitOnError: false,
          rejectionHandlers: isProduction
            ? [new winston.transports.File({ filename: 'rejections.log' })]
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
    AuthZModule.register({
      imports: [NacosConfigModule],
      enforcerProvider: {
        provide: AUTHZ_ENFORCER,
        useFactory: async (config: NacosConfigService) => {
          const configs = await config.getConfig('service-auth.json');

          return casbin.newEnforcer(
            resolve(__dirname, '../model/auth.conf'),
            await TypeORMAdapter.newAdapter(configs.casbin.db),
          );
        },
        inject: [NacosConfigService],
      },
      usernameFromContext: (ctx) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user && request.user.username;
      },
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule, NacosConfigModule],
      useFactory: async (config: NacosConfigService) => {
        const configs = await config.getConfig('service-auth.json');
        return configs.jwt;
      },
      inject: [NacosConfigService],
    }),
  ],
  controllers: [AppController],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly nacosConfigService: NacosConfigService,
  ) {}

  async onModuleInit() {
    // await this.nacosNamingService.registerInstance(AUTH_SERVICE_NAME, {
    //   port: parseInt(this.configService.get('app.port')),
    //   ip: this.configService.get('app.hostname'),
    // });
  }
}
