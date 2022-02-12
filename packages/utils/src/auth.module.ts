import { JwtModule } from '@nestjs/jwt';
// import { AuthService } from './auth.service';
// import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AuthController from './auth.controller';
// import { UserModule } from '@/rbac';

const JwtPassportModule = PassportModule.register({
  defaultStrategy: 'jwt',
});

@Module({
  imports: [
    // forwardRef(() => UserModule),
    JwtPassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwt.secret'),
        signOptions: { expiresIn: config.get('jwt.expire') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [],
  exports: [JwtPassportModule],
})
export class AuthModule {}
