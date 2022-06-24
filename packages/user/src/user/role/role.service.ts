import { RoleEntity } from './role.entity';

import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateRoleDto } from './role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ResultCode } from '@letscollab/helper';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_RMQ } from 'src/app.constants';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
    @Inject(AUTH_RMQ)
    private readonly authClient: ClientProxy,
    private readonly dataSource: DataSource,
    private readonly logger: Logger,
  ) {}

  async create(role: CreateRoleDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const roleEntity = this.roleRepo.create(role);
    await queryRunner.manager.save(roleEntity).catch(async (err) => {
      this.logger.error(err);

      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: err?.code === 'ER_DUP_ENTRY' ? '角色重复' : '创建失败',
      });
    });

    await queryRunner.commitTransaction();

    // try {
    // } catch (error) {
    // } finally {
    //   await queryRunner.release();
    // }

    // await queryRunner.commitTransaction();

    return { code: ResultCode.SUCCESS, message: '创建成功' };
  }

  async deleteRole({ id }) {
    await this.roleRepo.delete({ id }).catch(() => {
      throw new InternalServerErrorException();
    });

    return { code: ResultCode.SUCCESS, message: '删除成功' };
  }
}
