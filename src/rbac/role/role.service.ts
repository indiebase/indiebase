import { UserEntity } from '@/rbac';
import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { RoleEntity } from './role.entity';
import { CreateRoleDto, QueryRolesDto } from './role.dto';

export enum RoleActions {
  delete,
  create,
  update,
  query,
  all,
}

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
  ) {}

  async createRole(body: CreateRoleDto, user: UserEntity): Promise<any> {
    console.log(user);
    const roleEntity = this.roleRepo.create(body);
    return this.roleRepo.save(roleEntity);
  }

  async queryRoles(query: QueryRolesDto): Promise<any> {
    query = Object.assign({}, { pageSize: 20, current: 1 }, query);
    const { name } = query;
    const condition = [];
    name && condition.push({ name: Like(`%${name}%`) });

    try {
      const [list, total] = await this.roleRepo.findAndCount({
        where: condition,
        skip: (query.current - 1) * query.pageSize,
        take: query.pageSize,
      });
      return {
        list,
        total,
      };
    } catch (error) {
      throw error;
    }
  }

  async delRole(id: number) {
    return this.roleRepo.delete({ id });
  }

  async updateRole(body: CreateRoleDto) {
    return this.roleRepo.update({ id: body.id }, body);
  }
}
