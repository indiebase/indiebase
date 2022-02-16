import { JwtModule } from '@nestjs/jwt';
import { Module, OnModuleInit } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import AuthController from './auth.controller';
import { SERVICE_NAME, USER_CLIENT } from './auth.constants';
import {
  NacosNamingModule,
  NacosConfigModule,
  NacosNamingService,
  NacosConfigService,
  NacosConfigClientOptions,
} from '@letscollab/nestjs-nacos';
import { resolve } from 'path';
import configure from '@/config';

const JwtPassportModule = PassportModule.register({
  defaultStrategy: 'jwt',
});

@Module({
  imports: [
    JwtPassportModule,
    ConfigModule.forRoot({
      envFilePath: resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
      isGlobal: true,
      load: configure,
    }),
    NacosNamingModule.forRootAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          serverList: '0.0.0.0:13324',
          namespace: config.get('nacos.namespace'),
        };
      },
    }),
    NacosConfigModule.forRootAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          serverAddr: '0.0.0.0:13324',
          namespace: config.get('nacos.namespace'),
        };
      },
    }),
    ClientsModule.register([
      {
        name: USER_CLIENT,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4010,
        },
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwt.secret'),
        signOptions: { expiresIn: config.get('jwt.expire') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  exports: [JwtPassportModule],
})
export class AuthModule implements OnModuleInit {
  constructor(
    private readonly nacosNamingService: NacosNamingService,
    private readonly nacosConfigService: NacosConfigService,
  ) {}

  async onModuleInit() {
    await this.nacosNamingService.client.registerInstance(SERVICE_NAME, {
      ip: '1.1.1.1',
      port: 11111,
    });

    const dataId = 'nacos.test.1';
    const group = 'DEFAULT_GROUP';
    const str = `example_test_${Math.random()}_${Date.now()}`;

    await this.nacosConfigService.client.publishSingle(dataId, group, str);
    const content = await this.nacosConfigService.client.getConfig(
      dataId,
      group,
    );
    console.log('current content => ' + content);
  }
}
