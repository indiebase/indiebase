import { MailService } from '../mail/mail.service';
import { Logger, Module, forwardRef } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { OrgModule } from '../org/org.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    forwardRef(() => OrgModule),
  ],
  controllers: [ProjectController],
  providers: [Logger, ProjectService, MailService],
  exports: [ProjectService],
})
export class ProjectModule {}
