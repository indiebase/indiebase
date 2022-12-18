import { Logger, Module } from '@nestjs/common';
import { PassportModule } from '@letscollab-nest/fastify-passport';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { GithubStrategy } from './github.strategy';
import { GATEWAY_QUEUE, USER_RMQ } from '@letscollab-nest/helper';
import { LocalStrategy } from './local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    ClientsModule.registerAsync([
      {
        name: USER_RMQ,
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService) {
          return {
            transport: Transport.RMQ,
            options: {
              urls: config.get('rmq.urls'),
              queue: GATEWAY_QUEUE,
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
  providers: [AuthService, GithubStrategy, LocalStrategy, Logger],
  exports: [AuthService, GithubStrategy, LocalStrategy, PassportModule],
})
export class AuthModule {}
