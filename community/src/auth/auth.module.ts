import { forwardRef, Logger, Module } from '@nestjs/common';
import { PassportModule } from '@indiebase/nest-fastify-passport';
import { AuthController } from './auth.controller';
import { GithubStrategy } from './github.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
// import { UserModule } from '../user/user.module';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    // forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [
    Logger,
    GithubStrategy,
    GoogleStrategy,
    LocalStrategy,
    AuthService,
  ],
  exports: [
    PassportModule,
    GithubStrategy,
    GoogleStrategy,
    LocalStrategy,
    AuthService,
  ],
})
export class AuthModule {}
