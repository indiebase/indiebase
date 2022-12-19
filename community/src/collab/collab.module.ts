import { Module } from '@nestjs/common';
import { InvitationModule } from './invitation/invitation.module';
import { OrgModule } from './org/org.module';
import { PrjModule } from './prj/prj.module';

@Module({
  imports: [InvitationModule, PrjModule, OrgModule],
})
export class CollabModule {}
