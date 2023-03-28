import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationController } from './invitation.controller';
import { InvitationEntity } from './invitation.entity';
import { InvitationService } from './invitation.service';

@Module({
  imports: [TypeOrmModule.forFeature([InvitationEntity])],
  controllers: [InvitationController],
  providers: [Logger, InvitationService],
  exports: [InvitationService],
})
export class InvitationModule {}
