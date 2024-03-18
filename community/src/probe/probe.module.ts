import { HttpModule } from '@nestjs/axios';
import { ConsoleLogger, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { KnexHealthIndicator } from './knex.health';
import { ProbeController } from './probe.controller';

@Module({
  imports: [
    HttpModule,
    TerminusModule.forRoot({
      logger: ConsoleLogger,
      errorLogStyle: 'json',
    }),
  ],
  controllers: [ProbeController],
  providers: [KnexHealthIndicator],
})
export class ProbeModule {}
