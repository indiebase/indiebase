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
import { NACOS_DATA_ID } from '@/app.constants';
import { NacosUtils } from '@letscollab/utils';
const PassportModule = ForwardPassportModule.register({
  defaultStrategy: 'jwt',
});

@Module({
  imports: [
    PassportModule,
    NacosConfigModule,
    JwtModule.registerAsync({
      imports: [NacosConfigModule],
      inject: [NacosConfigService],
      async useFactory(nacosConfigService: NacosConfigService) {
        const options = await NacosUtils.getConfig(
          nacosConfigService,
          NACOS_DATA_ID,
        );
        return options?.jwt;
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
