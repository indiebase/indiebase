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
import {
  CreateTeamDto,
  DeleteTeamDto,
  InviteMemberDto,
  QueryTeamDto,
  UpdateTeamDto,
} from './team.dto';
import { ResultCode } from '@letscollab/helper';
import { TeamEntity } from './team.entity';
import { Repository } from 'typeorm';
import { lastValueFrom, timeout, catchError } from 'rxjs';
import { TeamInvitationRepository } from './team_invitation.repository';
import { UserResDto } from '@letscollab/user';
import { InvitationStatus } from './team_invitation.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepo: Repository<TeamEntity>,

    @InjectRepository(TeamInvitationRepository)
    private readonly inviteRepo: TeamInvitationRepository,

    @Inject(AUTH_RMQ)
    private readonly authClient: ClientProxy,

    @Inject(USER_RMQ)
    private readonly userClient: ClientProxy,

    @Inject(MAIL_RMQ)
    private readonly mailClient: ClientProxy,

    private readonly logger: Logger,
  ) {}

  // async onModuleInit() {
  //   await this.authClient.connect().catch((err) => {
  //     this.logger.error(err.message, err.stack);
  //   });

  //   await this.userClient.connect().catch((err) => {
  //     this.logger.error(err.message, err.stack);
  //   });
  // }

  private async getUser<T>(cmd: string, c: any, errorMsg?: string) {
    return lastValueFrom<T>(
      this.userClient.send({ cmd }, c).pipe(
        timeout(4000),
        catchError((e) => {
          throw new InternalServerErrorException({
            message: errorMsg ?? '获取用户信息失败',
          });
        }),
      ),
    );
  }

  async queryTeam(body: QueryTeamDto) {
    body = Object.assign({}, body);
    const { name, current, pageSize } = body;
    const cond = [];
    name && cond.push({ name });
    console.log(body);

    const [list, total] = await this.teamRepo.findAndCount({
      where: cond,
      relations: ['members'],
      skip: (current - 1) * pageSize,
      take: pageSize,
    });

    return {
      code: ResultCode.SUCCESS,
      pageSize,
      total,
      current,
      d: list,
    };
  }

  async createTeam(body: CreateTeamDto) {
    const teamEntity = this.teamRepo.create(body);
    await this.teamRepo.save(teamEntity).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: err?.code === 'ER_DUP_ENTRY' ? '团队名重复' : '创建失败',
      });
    });

    return { code: ResultCode.SUCCESS, message: '创建成功' };
  }

  async updateTeam(body: UpdateTeamDto) {
    const { id, ...rest } = body;
    this.teamRepo.remove;
    await this.teamRepo.update({ id }, rest).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: err?.code === 'ER_DUP_ENTRY' ? '团队名重复' : '更新失败',
      });
    });

    return { code: ResultCode.SUCCESS, message: '更新成功' };
  }

  async deleteTeam(body: DeleteTeamDto) {
    const { id } = body;
    await this.teamRepo.delete({ id }).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: '删除失败',
      });
    });

    return { code: ResultCode.SUCCESS, message: '删除成功' };
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
          // lastValueFrom()

          await this.inviteRepo.createInvitation({
            hostId: host.d.id,
            targetId: target.d.id,
            status: InvitationStatus.pending,
            hostUsername: host.d.username,
            targetUsername: target.d.username,
            hostNickname: host.d.nickname,
            targetNickname: target.d.nickname,
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
