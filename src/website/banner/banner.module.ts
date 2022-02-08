import { BannerEntity } from './banner.entity';
import { BannerService } from './banner.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  DashBannerController,
  SiteBannerController,
} from './banner.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([BannerEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwt.secret'),
        signOptions: { expiresIn: config.get('jwt.expire') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [DashBannerController, SiteBannerController],
  providers: [BannerService, BannerService],
  exports: [BannerService],
})
export class BannerModule {}
