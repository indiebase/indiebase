import { RoleEntity } from './role.entity';

import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateRoleDto, QueryRoleDto, UpdateRoleDto } from './role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { awaitValue, ResultCode } from '@letscollab/helper';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_RMQ } from '../../app.constants';

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

  async createRole(role: CreateRoleDto) {
    const roleEntity = this.roleRepo.create({
      name: role.name,
      description: role.description,
      possession: role.possession,
      domain: role.domain,
    });
    await this.roleRepo
      .save(roleEntity)
      .then(() => {
        if (role.possession && role.possession.length > 0) {
          awaitValue(
            this.authClient,
            { cmd: 'set_role_policy' },
            {
              name: role.name,
              possession: role.possession,
              domain: role.domain,
            },
            (e) => {
              this.logger.error(e);
              throw new Error('Set role possession error');
            },
          );
        }
      })
      .catch(async (err) => {
        this.logger.error(err);

        throw new InternalServerErrorException({
          code: ResultCode.ERROR,
          message: err?.code === 'ER_DUP_ENTRY' ? 'Role repeat' : 'Create fail',
        });
      });

    return {
      code: ResultCode.SUCCESS,
      message: 'Create successfully',
    };
  }

  async deleteRole(id: number) {
    await this.roleRepo.delete({ id }).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException();
    });

    return {
      code: ResultCode.SUCCESS,
      message: 'Delete successfully',
    };
  }

  async updateRole(body: UpdateRoleDto) {
    const { id, name, status, description } = body;
    await this.roleRepo
      .update({ id }, { name, status, description })
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException({
          message: err?.code === 'ER_DUP_ENTRY' ? 'Role repeat' : 'Update fail',
        });
      });

    return {
      code: ResultCode.SUCCESS,
      message: 'Update successfully',
    };
  }

  async queryRoles(body: QueryRoleDto) {
    body = Object.assign({}, body);
    const { name, current, pageSize, id } = body;
    const cond = [];
    name && cond.push({ name });
    id && cond.push({ id });

    const [list, total] = await this.roleRepo
      .findAndCount({
        where: cond,
        skip: (current - 1) * pageSize,
        take: pageSize,
      })
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException();
      });

    return {
      code: ResultCode.SUCCESS,
      total,
      pageSize,
      current,
      d: list,
    };
  }
}
