import { ResultCode } from '@letscollab/helper';
import { TeamInvitationEntity } from './team_invitation.entity';
import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(TeamInvitationEntity)
export class TeamInvitationRepository extends Repository<TeamInvitationEntity> {
  async createInvitation(
    body: Omit<TeamInvitationEntity, 'id'>,
  ): Promise<TeamInvitationEntity> {
    const entity = this.create(body);
    return this.save(entity).catch((err) => {
      throw new InternalServerErrorException({
        code: ResultCode.SUCCESS,
        message: err.message,
      });
    });
  }
}
