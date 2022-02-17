import { JwtModule } from '@nestjs/jwt';
import { Module, OnModuleInit } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import AuthController from './auth.controller';
import {
  NACOS_DATA_ID,
  NACOS_GROUP,
  // NACOS_GROUP,
  // NACOS_GROUP,
  SERVICE_NAME,
  USER_CLIENT,
} from '@/auth.constants';
import {
  NacosNamingModule,
  NacosConfigModule,
  NacosNamingService,
  NacosConfigService,
} from '@letscollab/nestjs-nacos';
import { resolve } from 'path';
import configure from '@/config';
import { CasbinModule } from '@letscollab/nestjs-casbin';
import { NacosUtils } from '@letscollab/utils';
import TypeormAdapter from 'typeorm-adapter';

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
          serverList: config.get('nacos.serverList'),
          namespace: config.get('nacos.namespace'),
        };
      },
    }),
    NacosConfigModule.forRootAsync({
      imports: [],
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
      useFactory: async (nacosConfigService: NacosConfigService) => {
        const options = await NacosUtils.getConfig(
          nacosConfigService,
          NACOS_DATA_ID,
        );

        return {
          model: resolve(__dirname, '../model/auth.conf'),
          adapter: TypeormAdapter.newAdapter(options.casbin.db),
        };
      },
      inject: [NacosConfigService],
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

    const dataId = 'service-auth-mysql';
    const group = 'DEFAULT_GROUP';
    // const str = {
    //   name: 'demo',
    // };

    // await this.nacosConfigService.client.publishSingle(
    //   dataId,
    //   group,
    //   JSON.stringify(str),
    // );
    const content = await this.nacosConfigService.client.getConfig(
      dataId,
      group,
    );
    console.log('current content => ' + content);
  }
}
