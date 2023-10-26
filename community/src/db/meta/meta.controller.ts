import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'meta',
  version: '1',
})
@ApiTags('Metadata/v1')
export class ProbeController {
  constructor(private readonly logger: Logger) {}

  @Get('liveness')
  async livenessProbe() {}
}
