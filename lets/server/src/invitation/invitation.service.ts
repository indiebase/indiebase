import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvitationEntity } from './invitation.entity';
import { Repository } from 'typeorm';
import { ResultCode, UserSession } from '@letscollab/trait';
import { InviteMembersDto } from './invitation.dto';
import { UserService } from '../../user/user.service';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(InvitationEntity)
    private readonly inviteRepo: Repository<InvitationEntity>,
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  private async createInvitation(
    body: Omit<InvitationEntity, 'id'>,
  ): Promise<InvitationEntity> {
    const entity = this.inviteRepo.create(body);
    return this.inviteRepo.save(entity).catch((err) => {
      throw new InternalServerErrorException({
        code: ResultCode.SUCCESS,
        message: err.message,
      });
    });
  }

  async inviteMembers(
    { inviteesEmails }: InviteMembersDto,
    { id, username }: UserSession,
  ) {
    // if (target.code > 0 && host.code > 0) {
    //   const record = await this.inviteRepo.findOne({
    //     where: {
    //       hostId: host.d.id,
    //       targetId: target.d.id,
    //     },
    //   });
    //   switch (record?.status) {
    //     case InvitationStatus.pending:
    //       return {
    //         code: ResultCode.SUCCESS,
    //         message: 'Invitation has been sent, please wait for a reply',
    //       };
    //     case InvitationStatus.fulfilled:
    //       return {
    //         code: ResultCode.SUCCESS,
    //         message: 'Already in the organization',
    //       };
    //     default:
    //       await this.createInvitation({
    //         hostId: host.d.id,
    //         targetId: target.d.id,
    //         status: InvitationStatus.pending,
    //         hostUsername: host.d.username,
    //         targetUsername: target.d.username,
    //         hostNickname: host.d.nickname,
    //         targetNickname: target.d.nickname,
    //         type: body.type,
    //       });
    //       return {
    //         code: ResultCode.SUCCESS,
    //         message: '邀请发送成功',
    //       };
    //   }
    // } else {
    //   return {
    //     code: ResultCode.ERROR,
    //     message: '未查询到用户信息',
    //   };
    // }
  }
}
