import { NacosConfigModule, NacosConfigService } from '@letscollab-nest/nacos';
import { PrjController } from './prj.controller';
import { Logger, Module } from '@nestjs/common';

@Module({
  controllers: [PrjController],
  providers: [Logger],
})
export class PrjModule {}
