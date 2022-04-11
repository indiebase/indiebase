import { AUTH_RMQ } from '../app.constants';
import { Module } from '@nestjs/common';
import { PassportModule as ForwardPassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { NacosConfigModule, NacosConfigService } from '@letscollab/nest-nacos';
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
        name: AUTH_RMQ,
        imports: [NacosConfigModule],
        inject: [NacosConfigService],
        async useFactory(nacosConfigService: NacosConfigService) {
          const nacosConfigs = await nacosConfigService.getConfig(
            'service-user.json',
          );

          return {
            transport: Transport.RMQ,
            options: {
              urls: nacosConfigs.rabbitmq.urls,
              queue: 'user_queue',
              queueOptions: {
                durable: false,
              },
            },
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
