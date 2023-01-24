import { MailService } from '../../msg';
import { Logger, Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  controllers: [ProjectController],
  providers: [Logger, ProjectService, MailService],
})
export class ProjectModule {}
