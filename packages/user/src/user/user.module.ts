import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { NACOS_AUTH_DATA_ID, AUTH_SERVICE_NAME } from '@/app.constants';
import {
  NacosConfigModule,
  NacosConfigService,
} from '@letscollab/nestjs-nacos';
import { NacosUtils } from '@letscollab/utils';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE_NAME,
        imports: [NacosConfigModule],
        inject: [NacosConfigService],
        async useFactory(nacosConfigService: NacosConfigService) {
          const configs = await NacosUtils.getConfig(
            nacosConfigService,
            NACOS_AUTH_DATA_ID,
          );
          return {
            transport: Transport.TCP,
            options: {
              port: configs.app.authMicroservicePort,
            },
          };
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
