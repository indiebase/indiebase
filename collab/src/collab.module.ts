import { Module } from '@nestjs/common';
import { InvitationModule } from './invitation/invitation.module';
import { OrgModule } from './collab/org/org.module';
import { ProjectModule } from './collab/project/project.module';

@Module({
  imports: [OrgModule, ProjectModule, InvitationModule],
})
export class CollabModule {}
