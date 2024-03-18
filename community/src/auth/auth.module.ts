import { PassportModule } from '@indiebase/nest-fastify-passport';
import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PasetoModule } from 'nestjs-paseto';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PasetoStrategy } from './paseto.strategy';
import { GithubStrategy, GoogleStrategy, MicrosoftStrategy } from './social';

@Module({
  imports: [
    PassportModule.register({}),
    PasetoModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const privateKey = config.get('auth.pasetoSecret');

        return {
          version: 'V4',
          privateKey,
          produceOptions: {
            expiresIn: '365d',
          },
        };
      },
    }),
    // forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [
    Logger,
    GithubStrategy,
    GoogleStrategy,
    MicrosoftStrategy,
    PasetoStrategy,
    LocalStrategy,
    AuthService,
  ],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
