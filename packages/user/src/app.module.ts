import { Module, OnModuleInit } from '@nestjs/common';
import {
  NacosNamingModule,
  NacosConfigModule,
  NacosNamingService,
  NacosConfigService,
} from '@letscollab/nest-nacos';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NACOS_USER_DATA_ID, USER_SERVICE_NAME } from './app.constants';
import { resolve } from 'path';
import configure from '@/config';
import { UserModule } from './user/user.module';
import { I18nModule } from 'nestjs-i18n';
const isProd = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
      isGlobal: true,
      load: configure,
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
    I18nModule.forRoot({
      fallbackLanguage: 'zh',
      loaderOptions: {
        path: resolve(process.cwd(), './i18n'),
        watch: !isProd,
      },
      logging: !isProd,
    }),
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
    TypeOrmModule.forRootAsync({
      imports: [NacosConfigModule],
      inject: [NacosConfigService],
      async useFactory(nacosConfigService: NacosConfigService) {
        const configs = await nacosConfigService.getConfig('service-user.json');
        return {
          ...configs.orm,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly nacosConfigService: NacosConfigService) {}
  async onModuleInit() {
    // this.nacosNamingService.client.subscribe(USER_SERVICE_NAME, (...e) => {
    //   console.log(e);
    // });
  }
}
