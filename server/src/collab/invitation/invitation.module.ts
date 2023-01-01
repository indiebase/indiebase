import { Logger, Module } from '@nestjs/common';
import { InvitationController } from './invitation.controller';

@Module({
  controllers: [InvitationController],
  providers: [Logger],
})
export class InvitationModule {}
