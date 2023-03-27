import { Controller, Logger } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'health',
  version: '1',
})
@ApiTags('v1/Health')
export class HealthController {
  constructor(
    private readonly health: HealthService,
    private readonly logger: Logger,
  ) {}
}
