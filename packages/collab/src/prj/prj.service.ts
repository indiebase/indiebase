import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { MAIL_RMQ, AUTH_RMQ } from '../app.constants';
import {
  CreatePrjDto,
  DeletePrjDto,
  QueryPrjDto,
  UpdatePrjDto,
} from './prj.dto';
import { ResultCode } from '@letscollab/helper';

import { Repository } from 'typeorm';
import { PrjEntity } from './prj.entity';

@Injectable()
export class PrjService {
  constructor(
    @InjectRepository(PrjEntity)
    private readonly prjRepo: Repository<PrjEntity>,

    @Inject(AUTH_RMQ)
    private readonly authClient: ClientProxy,

    @Inject(MAIL_RMQ)
    private readonly mailClient: ClientProxy,

    private readonly logger: Logger,
  ) {}

  async createPrj(body: CreatePrjDto) {
    const prjEntity = this.prjRepo.create(body);
    await this.prjRepo.save(prjEntity).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: err?.code === 'ER_DUP_ENTRY' ? '项目名名重复' : '创建失败',
      });
    });

    return { code: ResultCode.SUCCESS, message: '创建成功' };
  }

  async queryPrj(body: QueryPrjDto) {
    const prjEntity = this.prjRepo.create(body);
    await this.prjRepo.save(prjEntity).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: err?.code === 'ER_DUP_ENTRY' ? '团队名重复' : '创建失败',
      });
    });

    return { code: ResultCode.SUCCESS, message: '创建成功' };
  }

  // TODO
  async updatePrj(body: UpdatePrjDto) {
    const { id, ...rest } = body;
    this.prjRepo.remove;
    await this.prjRepo.update({ id }, rest).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: err?.code === 'ER_DUP_ENTRY' ? '项目已存在' : '创建失败',
      });
    });

    return { code: ResultCode.SUCCESS, message: '创建成功' };
  }

  async deletePrj(body: DeletePrjDto) {
    const { id } = body;
    await this.prjRepo.delete({ id }).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: '删除失败',
      });
    });

    return { code: ResultCode.SUCCESS, message: '创建成功' };
  }
}
