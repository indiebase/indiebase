import { AnncModule } from './annc';
import { Module } from '@nestjs/common';
import { BannerModule } from './banner';

@Module({
  imports: [BannerModule, AnncModule],
  exports: [BannerModule, AnncModule],
})
export class SiteModule {}
