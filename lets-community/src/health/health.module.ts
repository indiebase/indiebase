import { Logger, Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  controllers: [HealthController],
  providers: [Logger, HealthService],
  exports: [HealthService],
})
export class HealthModule {}
