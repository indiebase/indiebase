import { RoleEntity } from './role.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateRoleDto, QueryRoleDto, UpdateRoleDto } from './role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ResultCode } from '@letscollab-nest/helper';
import { CreateRoleBody } from '@letscollab-nest/trait';
import { CasbinService } from '@letscollab-nest/accesscontrol';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
    private readonly dataSource: DataSource,
    private readonly logger: Logger,
    private readonly casbin: CasbinService,
  ) {}

  async createRole(role: CreateRoleDto) {
    const runner = this.dataSource.createQueryRunner();
    const { name, description, domain, possession } = role;

    const roleEntity = this.roleRepo.create({
      name,
      description,
      domain,
    });

    await runner.connect();
    await runner.startTransaction();
    await runner.manager
      .save(roleEntity)
      .then(async () => {
        if (role?.possession.length > 0) {
          return this.createRolePolicy({
            name,
            possession,
            domain,
          });
        }
      })
      .catch(async (err) => {
        await runner.rollbackTransaction();
        this.logger.error(err);

        if (err?.code === 'ER_DUP_ENTRY') {
          throw new ConflictException(`Role [${role.name}] existed`);
        }

        throw new InternalServerErrorException('Fail to create');
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

  async createRolePolicy(body: CreateRoleBody) {
    for await (const item of body.possession) {
      for (const action of item.action) {
        await this.casbin.e
          .addPolicy(body.name, body.domain, item.resource, action)
          .catch((err) => {
            this.logger.error(err);
            throw new InternalServerErrorException({
              message: 'Error creating role',
            });
          });
      }
    }
  }

  async attachRole2User({ username, roleName, domain }: any) {
    return this.casbin.e
      .addRoleForUser(username, roleName, domain)
      .catch((err) => {
        this.logger.error(err);

        throw new InternalServerErrorException({
          code: ResultCode.ERROR,
          message: err,
        });
      });
  }

  async updateRole(body: UpdateRoleDto) {
    const { id, name, status, description } = body;
    await this.roleRepo
      .update({ id }, { name, status, description })
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException('Update fail');
      });

    return {
      code: ResultCode.SUCCESS,
      message: 'Update successfully',
    };
  }

  async attachRole(body: any) {
    await this.attachRole2User(body).catch(() => {});

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