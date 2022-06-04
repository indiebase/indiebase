import { MAIL_RMQ } from '../app.constants';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_RMQ, USER_RMQ } from '../app.constants';

import { ResultCode } from '@letscollab/helper';
import { lastValueFrom, timeout, catchError } from 'rxjs';
import { InvitationRepository } from './invitation.repository';
import { UserResDto } from '@letscollab/user';
import { InvitationStatus } from './invitation.entity';
import { InviteMemberDto } from './invitation.dto';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(InvitationRepository)
    private readonly inviteRepo: InvitationRepository,

    @Inject(AUTH_RMQ)
    private readonly authClient: ClientProxy,

    @Inject(USER_RMQ)
    private readonly userClient: ClientProxy,

    @Inject(MAIL_RMQ)
    private readonly mailClient: ClientProxy,

    private readonly logger: Logger,
  ) {}

  private async getUser<T>(cmd: string, c: any, errorMsg?: string) {
    return lastValueFrom<T>(
      this.userClient.send({ cmd }, c).pipe(
        timeout(4000),
        catchError((e) => {
          this.logger.error(e);
          throw new InternalServerErrorException({
            message: errorMsg ?? '获取用户信息失败',
          });
        }),
      ),
    );
  }

  async inviteMember(body: InviteMemberDto, user: any) {
    const target = await this.getUser<UserResDto>('get_id', body.id);
    const host = await this.getUser<UserResDto>('get_name', user.username);

    if (target.code > 0 && host.code > 0) {
      const record = await this.inviteRepo.findOne({
        hostId: host.d.id,
        targetId: target.d.id,
      });

      switch (record?.status) {
        case InvitationStatus.pending:
          return {
            code: ResultCode.SUCCESS,
            message: '邀请已发送, 请等待对方回复',
          };
        case InvitationStatus.fulfilled:
          return {
            code: ResultCode.SUCCESS,
            message: '对方已在团队内',
          };
        default:
          await this.inviteRepo.createInvitation({
            hostId: host.d.id,
            targetId: target.d.id,
            status: InvitationStatus.pending,
            hostUsername: host.d.username,
            targetUsername: target.d.username,
            hostNickname: host.d.nickname,
            targetNickname: target.d.nickname,
            type: body.type,
          });
          return {
            code: ResultCode.SUCCESS,
            message: '邀请发送成功',
          };
      }
    } else {
      return {
        code: ResultCode.ERROR,
        message: '未查询到用户信息',
      };
    }
  }
}
