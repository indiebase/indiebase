import { TeamController } from './team.controller';
import { Logger, Module } from '@nestjs/common';

@Module({
  controllers: [TeamController],
  providers: [Logger],
})
export class TeamModule {}
