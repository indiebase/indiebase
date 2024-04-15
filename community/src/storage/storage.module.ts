import { Logger, Module } from '@nestjs/common';

import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';

@Module({
  controllers: [StorageController],
  providers: [Logger, StorageService],
  exports: [StorageService],
})
export class StorageModule {}
