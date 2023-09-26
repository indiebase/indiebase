import { Logger, Module } from '@nestjs/common';
import { PassportModule } from '@indiebase/nest-fastify-passport';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { PasetoModule } from 'nestjs-paseto';
import { ConfigService } from '@nestjs/config';

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
    LocalStrategy,
    AuthService,
  ],
  exports: [
    PassportModule,
    // GithubStrategy,
    // GoogleStrategy,
    LocalStrategy,
    AuthService,
  ],
})
export class AuthModule {}
