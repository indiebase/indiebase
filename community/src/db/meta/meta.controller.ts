import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  path: '/db/meta',
  version: '1',
})
@ApiTags('dbMetaV1')
export class ProbeController {
  constructor(private readonly logger: Logger) {}

  @Get('liveness')
  async livenessProbe() {}
}
