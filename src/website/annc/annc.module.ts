import { AnncEntity } from './annc.entity';
import { AnncService } from './annc.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AnncController } from './annc.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnncEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwt.secret'),
        signOptions: { expiresIn: config.get('jwt.expire') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AnncController],
  providers: [AnncService, AnncService],
  exports: [AnncService],
})
export class AnncModule {}
