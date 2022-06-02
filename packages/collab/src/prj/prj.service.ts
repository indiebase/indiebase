import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { MAIL_RMQ, AUTH_RMQ } from '../app.constants';
import { createPrjDto, UpdateTeamDto } from './prj.dto';
import { ResultCode } from '@letscollab/helper';
import { TeamEntity } from './prj.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PrjService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepo: Repository<TeamEntity>,

    @Inject(AUTH_RMQ)
    private readonly authClient: ClientProxy,

    @Inject(MAIL_RMQ)
    private readonly mailClient: ClientProxy,

    private readonly logger: Logger,
  ) {}

  async createPrj(body: createPrjDto) {
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
        message: err?.code === 'ER_DUP_ENTRY' ? '团队名重复' : '创建失败',
      });
    });

    return { code: ResultCode.SUCCESS, message: '创建成功' };
  }
}
