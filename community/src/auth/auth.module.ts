import { forwardRef, Logger, Module } from '@nestjs/common';
import { PassportModule } from '@letscollab-nest/fastify-passport';
import { AuthController } from './auth.controller';
import { GithubStrategy } from './github.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [Logger, GithubStrategy, LocalStrategy, AuthService],
  exports: [PassportModule, GithubStrategy, LocalStrategy, AuthService],
})
export class AuthModule {}
