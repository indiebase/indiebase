import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { NACOS_AUTH_DATA_ID, AUTH_SERVICE_NAME } from '@/app.constants';
import { NacosConfigModule, NacosConfigService } from '@letscollab/nest-nacos';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // ClientsModule.registerAsync([
    //   {
    //     name: AUTH_SERVICE_NAME,
    //     imports: [ConfigModule],
    //     inject: [ConfigService],
    //     // async useFactory(nacosConfigService: NacosConfigService) {},
    //   },
    // ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
