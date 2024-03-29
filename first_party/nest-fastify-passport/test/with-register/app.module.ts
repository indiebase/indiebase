import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '../../src';
import { AppController } from '../common/app.controller';
import { AppService } from '../common/app.service';
import { JwtStrategy } from '../common/jwt.strategy';
import { LocalStrategy } from '../common/local.strategy';

@Module({
  controllers: [AppController],
  imports: [
    JwtModule.register({
      secret: 's3cr3t',
    }),
    PassportModule.register({}),
  ],
  providers: [AppService, LocalStrategy, JwtStrategy],
})
export class AppModule {}
