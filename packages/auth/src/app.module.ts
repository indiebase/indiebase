import { RbacModule } from './rbac/rbac.module';
import { JwtModule } from '@nestjs/jwt';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import configure from './config';
import TypeORMAdapter from 'typeorm-adapter';
import { NacosConfigModule, NacosConfigService } from '@letscollab/nest-nacos';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { WinstonModule, utilities } from 'nest-winston';
import { AuthModule } from './auth/auth.module';
import * as casbin from 'casbin';
import * as winston from 'winston';
import LokiTransport = require('winston-loki');
import { CasbinModule } from '@letscollab/nest-casbin';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

@Module({
  imports: [
    AuthModule,
    RbacModule,
    ConfigModule.forRoot({
      envFilePath: resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
      isGlobal: true,
      load: configure,
    }),
    RedisModule.forRootAsync({
      inject: [NacosConfigService],
      async useFactory(config: NacosConfigService) {
        const configs = await config.getConfig('service-auth.json');
        return configs.redis;
      },
    }),
    WinstonModule.forRootAsync({
      inject: [NacosConfigService],
      useFactory: async (config: NacosConfigService) => {
        const configs = await config.getConfig('service-auth.json');
        // const logStorageDir = configs.logger.storageDir
        //   ? configs.logger.storageDir
        //   : '/var/log';

        const transports: any[] = [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              utilities.format.nestLike(),
            ),
          }),
          new LokiTransport(configs.logger.loki),
        ];

        return {
          level: isDevelopment ? 'debug' : 'warn',
          format: winston.format.json(),
          defaultMeta: { service: 'auth' },
          exitOnError: false,
          rejectionHandlers: [new LokiTransport(configs.logger.rejectionLoki)],
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
    CasbinModule.forRootAsync({
      imports: [NacosConfigModule],
      inject: [NacosConfigService],
      async useFactory(config: NacosConfigService) {
        const configs = await config.getConfig('service-auth.json');

        return {
          model: resolve(__dirname, '../model/auth.conf'),
          adapter: await TypeORMAdapter.newAdapter(configs.casbin.db),
        };
      },
    }),
    // AuthZModule.register({
    //   imports: [NacosConfigModule],
    //   enforcerProvider: {
    //     provide: AUTHZ_ENFORCER,
    //     useFactory: async (config: NacosConfigService) => {
    //       const configs = await config.getConfig('service-auth.json');

    //       return casbin.newEnforcer(
    //         resolve(__dirname, '../model/auth.conf'),
    //         await TypeORMAdapter.newAdapter(configs.casbin.db),
    //       );
    //     },
    //     inject: [NacosConfigService],
    //   },
    //   usernameFromContext: (ctx) => {
    //     // const request = ctx.switchToHttp().getRequest();

    //     // return request.user && request.user.username;
    //     return 'demo';
    //   },
    // }),

    JwtModule.registerAsync({
      imports: [ConfigModule, NacosConfigModule],
      useFactory: async (config: NacosConfigService) => {
        const configs = await config.getConfig('service-auth.json');
        return configs.jwt;
      },
      inject: [NacosConfigService],
    }),
  ],
  providers: [Logger],
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
