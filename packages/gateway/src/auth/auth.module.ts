import { Logger, Module } from '@nestjs/common';
import { PassportModule } from '@letscollab-nest/fastify-passport';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import {
  AUTH_QUEUE,
  AUTH_RMQ,
  MSG_QUEUE,
  MSG_RMQ,
  USER_QUEUE,
  USER_RMQ,
} from '@letscollab-nest/helper';
import { GithubStrategy } from './github.strategy';
import { LocalStrategy } from './local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    ...[
      { name: AUTH_RMQ, queue: AUTH_QUEUE },
      { name: USER_RMQ, queue: USER_QUEUE },
      { name: MSG_RMQ, queue: MSG_QUEUE },
    ].map((val) => {
      return ClientsModule.registerAsync([
        {
          name: val.name,
          imports: [ConfigModule],
          inject: [ConfigService],
          async useFactory(config: ConfigService) {
            return {
              transport: Transport.RMQ,
              options: {
                urls: config.get('rmq.urls'),
                queue: val.queue,
                queueOptions: {
                  durable: false,
                },
              },
            };
          },
        },
      ]);
    }),
  ],
  controllers: [AuthController],
  providers: [Logger, GithubStrategy, LocalStrategy],
  exports: [PassportModule, GithubStrategy, LocalStrategy],
})
export class AuthModule {}
