import { Logger, Module } from '@nestjs/common';
import { ProbeController } from './probe.controller';
import { ProbeService } from './probe.service';

@Module({
  controllers: [ProbeController],
  providers: [Logger, ProbeService],
  exports: [ProbeService],
})
export class ProbeModule {}
