import { Test, TestingModule } from '@nestjs/testing';
import { ProbeController } from './probe.controller';
import { TerminusModule } from '@nestjs/terminus';
import { KnexHealthIndicator } from './knex.health';
import { HttpModule } from '@nestjs/axios';
import { describe, beforeEach, it, expect } from 'vitest';
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
