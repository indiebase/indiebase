import { Logger, Module } from '@nestjs/common';
import { PassportModule } from '@indiebase/nest-fastify-passport';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { PasetoModule } from 'nestjs-paseto';
import { ConfigService } from '@nestjs/config';
import { PasetoStrategy } from './paseto.strategy';

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
            expiresIn: '60s',
          },
        };
      },
    }),
    // forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [
    Logger,
    // GithubStrategy,
    // GoogleStrategy,
    PasetoStrategy,
    // LocalStrategy,
    AuthService,
  ],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
