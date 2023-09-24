import { forwardRef, Logger, Module } from '@nestjs/common';
import { PassportModule } from '@indiebase/nest-fastify-passport';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { GithubStrategy, GoogleStrategy } from './social';
import { PasetoModule } from 'nestjs-paseto';
import { ConfigService } from '@nestjs/config';
// import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({}),
    PasetoModule.registerAsync({
      imports: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          version: 'V4',
          publicKey: 'k4.public.KqMxZ1Ou5lH3XGNkhi9HWwJmSNPLvor9DyQ8vdzKCA0',
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
