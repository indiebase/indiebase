import { RoleEntity } from './role.entity';

import { CasbinService } from '@letscollab/nest-casbin';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateRoleDto } from './role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResultCode } from '@letscollab/helper';

@Injectable()
export class RoleService {
  constructor(
    private readonly casbin: CasbinService,
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,

    private readonly logger: Logger,
  ) {}

  async addRole(role: CreateRoleDto) {
    const roleEntity = this.roleRepo.create(role);

    await this.roleRepo.save(roleEntity).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: err?.code === 'ER_DUP_ENTRY' ? '角色重复' : '创建失败',
      });
    });

    return { code: ResultCode.SUCCESS, message: '创建成功' };

    // await this.casbin.e.addPolicy(
    //   role.name,
    //   'letscollab.deskbtm.com,
    //   '/path/*',
    //   'read',
    // );
    console.log(
      await this.casbin.e.getRolesForUserInDomain(
        'letscollabtest',
        'letscollab.deskbtm.com',
      ),
    );
    const can = await this.casbin.e
      .enforce('admin', 'letscollab.deskbtm.com', '/path/demo', 'read')
      .catch((e) => {
        console.log(e);
      });

    // await this.casbin.e.addRoleForUser(
    //   'letscollabtest',
    //   role.name,
    //   'letscollab.deskbtm.com',
    // );
    // console.log(await this.casbin.e);
    // this.authzService.addRoleForUser();
  }

  async deleteRole(role: string) {}
}
