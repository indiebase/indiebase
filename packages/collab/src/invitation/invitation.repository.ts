import { ResultCode } from '@letscollab/helper';
import { InvitationEntity } from './invitation.entity';
import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(InvitationEntity)
export class InvitationRepository extends Repository<InvitationEntity> {
  async createInvitation(
    body: Omit<InvitationEntity, 'id'>,
  ): Promise<InvitationEntity> {
    const entity = this.create(body);
    return this.save(entity).catch((err) => {
      throw new InternalServerErrorException({
        code: ResultCode.SUCCESS,
        message: err.message,
      });
    });
  }
}
