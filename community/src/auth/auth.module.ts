import { forwardRef, Logger, Module } from '@nestjs/common';
import { PassportModule } from '@indiebase/nest-fastify-passport';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { GithubStrategy, GoogleStrategy } from './social';
import { PasetoModule } from 'nestjs-paseto';
// import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    PasetoModule.registerAsync({
      useFactory() {
        return {
          version: 'V4',
          publicKey: '',
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
