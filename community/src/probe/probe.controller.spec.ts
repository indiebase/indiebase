import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { KnexHealthIndicator } from './knex.health';
import { ProbeController } from './probe.controller';
// import { describe, beforeEach, it, expect } from 'vitest';

describe('ProbeController', () => {
  let probeController: ProbeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, TerminusModule],
      controllers: [ProbeController],
      providers: [KnexHealthIndicator],
    }).compile();

    probeController = app.get<ProbeController>(ProbeController);
  });

  describe('Liveness probe', () => {
    it('should return object', () => {
      expect(probeController.livenessProbe()).toBe('');
    });
  });
});
