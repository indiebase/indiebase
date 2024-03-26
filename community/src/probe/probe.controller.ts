import { InjectKnex } from '@indiebase/nest-knex';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  DiskHealthIndicator,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { HealthCheck } from '@nestjs/terminus';
import { Knex } from 'knex';
import * as path from 'path';

import { KnexHealthIndicator } from './knex.health';

@Controller({
  path: 'probe',
  version: '1',
})
@ApiTags('Probe/v1')
export class ProbeController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly db: KnexHealthIndicator,
    @InjectKnex() private readonly knex: Knex,
  ) {}

  @Get('liveness')
  @ApiOperation({
    operationId: 'liveness',
    summary: 'Liveness probe includes http, storage, memory, database',
  })
  @HealthCheck()
  async livenessProbe() {
    return this.health.check([
      () => this.http.pingCheck('ping_apple', 'time.apple.com'),
      () =>
        this.disk.checkStorage('storage', {
          path: path.resolve('/'),
          thresholdPercent: 0.9,
        }),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.db.pingCheck('postgres'),
    ]);
  }
}
