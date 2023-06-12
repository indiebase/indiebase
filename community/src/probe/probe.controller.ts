import { Controller, Get, Logger } from '@nestjs/common';
import { ProbeService } from './probe.service';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'probe',
  version: '1',
})
@ApiTags('v1/Probe')
export class ProbeController {
  constructor(
    private readonly health: ProbeService,
    private readonly logger: Logger,
  ) {}

  @Get('liveness')
  async livenessProbe() {}

  @Get('database')
  async databaseProbe() {}
}
