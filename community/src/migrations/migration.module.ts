import { OnModuleInit } from '@nestjs/common';
import { Global, Logger, Module } from '@nestjs/common';

import { MigrationService } from './migration.service';

@Module({
  providers: [MigrationService],
  exports: [MigrationService],
})
@Global()
export class MigrationModule implements OnModuleInit {
  private readonly logger = new Logger('MigrationModule');

  constructor(private readonly migrationService: MigrationService) {}

  async onModuleInit() {
    try {
      await this.migrationService.initMgr();
    } catch (error) {
      this.logger.error('Init:failed ' + error);
    }
  }
}
