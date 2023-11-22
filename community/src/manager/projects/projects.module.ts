import { Logger, Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  controllers: [ProjectsController],
  providers: [Logger, ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
