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
  UpdateTeamDto,
} from './team.dto';
import { ResultCode } from '@letscollab/helper';
import { TeamEntity } from './team.entity';
import { Repository } from 'typeorm';
import { lastValueFrom, timeout, catchError } from 'rxjs';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepo: Repository<TeamEntity>,

    @Inject(AUTH_RMQ)
    private readonly authClient: ClientProxy,

    @Inject(USER_RMQ)
    private readonly userClient: ClientProxy,

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

  private async getUser<T>(cmd: string, c: any) {
    return lastValueFrom<T>(
      this.userClient.send({ cmd }, c).pipe(
        timeout(4000),
        catchError((e) => {
          throw new InternalServerErrorException({
            message: '获取用户信息失败',
          });
        }),
      ),
    );
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

  async inviteMember(body: InviteMemberDto) {
    const r = await this.getUser('get_name', {});
    return { code: ResultCode.SUCCESS, message: '删除成功' };
  }
}
