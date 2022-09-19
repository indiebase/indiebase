import { RoleEntity } from './role.entity';

import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateRoleDto, QueryRoleDto, UpdateRoleDto } from './role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import {
  AUTH_RMQ,
  awaitValue,
  ResultCode,
  RpcException2Http,
} from '@letscollab/helper';
import { ClientProxy } from '@nestjs/microservices';

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
    const runner = this.dataSource.createQueryRunner();
    const roleEntity = this.roleRepo.create({
      name: role.name,
      description: role.description,
      domain: role.domain,
    });

    await runner.connect();
    await runner.startTransaction();
    await runner.manager
      .save(roleEntity)
      .then(async () => {
        if (role?.possession.length > 0) {
          return awaitValue(
            this.authClient,
            { cmd: 'set_role_policy' },
            {
              name: role.name,
              possession: role.possession,
              domain: role.domain,
            },
            (err) => {
              throw RpcException2Http(err);
            },
          );
        }
      })
      .catch(async (err) => {
        await runner.rollbackTransaction();

        this.logger.error(err);

        throw new BadRequestException({
          message:
            err?.code === 'ER_DUP_ENTRY'
              ? `Role [${role.name}] existed`
              : 'Fail to create',
        });
      });

    await runner.commitTransaction();
    await runner.release();

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

  async attachRole(body) {
    await awaitValue(this.authClient, { cmd: 'set_user_role' }, body, (err) => {
      throw RpcException2Http(err);
    });

    return {
      code: ResultCode.SUCCESS,
      message: 'Success',
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
