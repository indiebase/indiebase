import { RoleEntity } from './role.entity';

import { Injectable, Logger } from '@nestjs/common';
import { CreateRoleDto } from './role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResultCode } from '@letscollab/helper';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,

    private readonly logger: Logger,
  ) {}

  async addRole(role: CreateRoleDto) {
    // const roleEntity = this.roleRepo.create(role);

    // await this.roleRepo.save(roleEntity).catch((err) => {
    //   this.logger.error(err);
    //   throw new InternalServerErrorException({
    //     code: ResultCode.ERROR,
    //     message: err?.code === 'ER_DUP_ENTRY' ? '角色重复' : '创建失败',
    //   });
    // });

    return { code: ResultCode.SUCCESS, message: '创建成功' };
  }

  async deleteRole(role: string) {}
}
