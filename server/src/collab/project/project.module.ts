import { MailService } from '../../msg';
import { Logger, Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { OrgModule } from '../org/org.module';

@Module({
  imports: [OrgModule],
  controllers: [ProjectController],
  providers: [Logger, ProjectService, MailService],
  exports: [ProjectService],
})
export class ProjectModule {}
