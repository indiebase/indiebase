import { OnModuleInit } from '@nestjs/common';
import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PresetService } from './preset.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [PresetService],
  exports: [PresetService],
})
export class PresetModule implements OnModuleInit {
  private readonly logger = new Logger('PresetModule');

  constructor(private readonly presetService: PresetService) {}

  async onModuleInit() {
    try {
      await this.presetService.initAcl();
      await this.presetService.intStorage();
    } catch (error) {
      this.logger.error('Init:failed ' + error);
    }
  }
}
