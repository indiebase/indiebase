import { ConsoleLogger, Module } from '@nestjs/common';
import { ProbeController } from './probe.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { KnexHealthIndicator } from './knex.health';

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
