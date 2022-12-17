import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';

import {
  AUTH_RMQ,
  MAIL_RMQ,
  ResultCode,
  USER_RMQ,
} from '@letscollab-nest/helper';
import { lastValueFrom, timeout, catchError } from 'rxjs';
import { InvitationEntity, InvitationStatus } from './invitation.entity';
import { InviteMemberDto } from './invitation.dto';
import { Repository } from 'typeorm';
// import { UserResponseDto } from '@letscollab/user';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(InvitationEntity)
    private readonly inviteRepo: Repository<InvitationEntity>,

    @Inject(AUTH_RMQ)
    private readonly authClient: ClientProxy,

    @Inject(USER_RMQ)
    private readonly userClient: ClientProxy,

    @Inject(MAIL_RMQ)
    private readonly mailClient: ClientProxy,

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
    const target = await this.getUser<any>('get_id', body.id);
    const host = await this.getUser<any>('get_name', user.username);

    if (target.code > 0 && host.code > 0) {
      const record = await this.inviteRepo.findOne({
        where: {
          hostId: host.d.id,
          targetId: target.d.id,
        },
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
          await this.createInvitation({
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
