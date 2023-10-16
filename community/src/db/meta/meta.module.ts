import { Global, Logger, Module, OnModuleInit } from '@nestjs/common';
import { MetaService } from './meta.service';

@Module({
  providers: [MetaService],
  exports: [MetaService],
})
@Global()
export class MetaModule implements OnModuleInit {
  private readonly logger = new Logger(MetaModule.name);

  constructor(private readonly metaService: MetaService) {}

  async onModuleInit() {
    try {
      await this.metaService.initMgr();
    } catch (error) {
      this.logger.error('Init:failed ' + error);
    }
  }
}
