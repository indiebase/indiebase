import { Module } from '@nestjs/common';
import { PassportModule as ForwardPassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { NacosConfigModule, NacosConfigService } from '@letscollab/nest-nacos';
import { USER_SERVICE_NAME } from '@/app.constants';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
const PassportModule = ForwardPassportModule.register({
  defaultStrategy: 'jwt',
});

@Module({
  imports: [
    PassportModule,

    ClientsModule.registerAsync([
      {
        name: USER_SERVICE_NAME,
        async useFactory() {
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
        const configs = await nacosConfigService.getConfig('service-auth.json');
        return configs?.jwt;
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
