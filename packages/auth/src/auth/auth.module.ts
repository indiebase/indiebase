import { Logger, Module } from '@nestjs/common';
import { PassportModule as ForwardPassportModule } from '@letscollab/passport';
import { AuthService } from './auth.service';

// import { LocalStrategy } from './local.strategy';
import { NacosConfigModule, NacosConfigService } from '@letscollab/nest-nacos';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';

import { GithubStrategy } from './github.strategy';
import { USER_RMQ } from '@letscollab/helper';

const PassportModule = ForwardPassportModule.register({
  defaultStrategy: 'jwt',
});

@Module({
  imports: [
    PassportModule,
    ClientsModule.registerAsync([
      {
        name: USER_RMQ,
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
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // LocalStrategy,
    GithubStrategy,
    Logger,
  ],
  exports: [
    AuthService,
    // LocalStrategy,
    GithubStrategy,
    PassportModule,
  ],
})
export class AuthModule {}
