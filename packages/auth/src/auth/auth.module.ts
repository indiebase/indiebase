import { Module } from '@nestjs/common';
import { PassportModule as ForwardPassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import {
  NacosConfigModule,
  NacosConfigService,
} from '@letscollab/nestjs-nacos';
import { NACOS_AUTH_DATA_ID, USER_SERVICE_NAME } from '@/app.constants';
import { NacosUtils } from '@letscollab/utils';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
const PassportModule = ForwardPassportModule.register({
  defaultStrategy: 'jwt',
});

@Module({
  imports: [
    PassportModule,
    NacosConfigModule,
    ClientsModule.registerAsync([
      {
        name: USER_SERVICE_NAME,
        imports: [NacosConfigModule],
        inject: [NacosConfigService],
        async useFactory() {
          // const configs = await NacosUtils.getConfig(
          //   nacosConfigService,
          //   NACOS_AUTH_DATA_ID,
          // );
          return {
            transport: Transport.TCP,
          };
        },
      },
    ]),
    JwtModule.registerAsync({
      imports: [NacosConfigModule],
      inject: [NacosConfigService],
      async useFactory(nacosConfigService: NacosConfigService) {
        const options = await NacosUtils.getConfig(
          nacosConfigService,
          NACOS_AUTH_DATA_ID,
        );
        return options?.jwt;
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
