import type { OnModuleInit } from '@nestjs/common';
import { Global, Logger, Module } from '@nestjs/common';

import { PresetService } from './preset.service';

@Global()
@Module({
  providers: [PresetService],
  exports: [PresetService],
})
export class PresetModule implements OnModuleInit {
  private readonly logger = new Logger('PresetModule');

  constructor(private readonly presetService: PresetService) {}

  async onModuleInit() {
    try {
      await this.presetService.initAcl();
    } catch (error) {
      this.logger.error('Init:failed ' + error);
    }
  }
}
