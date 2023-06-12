import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BucketsEntity } from './buckets.entity';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([BucketsEntity])],
  controllers: [StorageController],
  providers: [Logger, StorageService],
  exports: [StorageService],
})
export class StorageModule {}
