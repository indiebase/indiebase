import { Module } from '@nestjs/common';
import { InvitationModule } from './invitation/invitation.module';
import { OrgModule } from './org/org.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [OrgModule, ProjectModule, InvitationModule],
})
export class CollabModule {}
