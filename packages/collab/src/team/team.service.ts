import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { USER_RMQ } from '../app.constants';
import {
  CreateTeamDto,
  DeleteTeamDto,
  QueryTeamDto,
  UpdateTeamDto,
} from './team.dto';
import { ResultCode } from '@letscollab/helper';
import { TeamEntity } from './team.entity';
import { Repository } from 'typeorm';

// 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;

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepo: Repository<TeamEntity>,

    @Inject(USER_RMQ)
    private readonly userClient: ClientProxy,

    private readonly logger: Logger,
  ) {}

  async queryTeam(body: QueryTeamDto) {
    body = Object.assign({}, body);
    const { name, current, pageSize } = body;
    const cond = [];
    name && cond.push({ name });

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
}
