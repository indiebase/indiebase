import { UserModule } from '../user/user.module';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationController } from './invitation.controller';
import { InvitationEntity } from './invitation.entity';
import { InvitationService } from './invitation.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([InvitationEntity])],
  controllers: [InvitationController],
  providers: [Logger, InvitationService],
  exports: [InvitationService],
})
export class InvitationModule {}
