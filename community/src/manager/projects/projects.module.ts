import { Logger, Module } from '@nestjs/common';

import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  controllers: [ProjectsController],
  providers: [Logger, ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
