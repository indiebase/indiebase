import { Logger, Module } from '@nestjs/common';
import { PassportModule } from '@letscollab-nest/fastify-passport';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { USER_QUEUE, USER_RMQ } from '@letscollab-nest/helper';
import { GithubStrategy } from './github.strategy';
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
              urls: config.get('amqp.urls'),
              queue: USER_QUEUE,
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
  providers: [Logger, GithubStrategy, LocalStrategy],
  exports: [PassportModule, GithubStrategy, LocalStrategy],
})
export class AuthModule {}
