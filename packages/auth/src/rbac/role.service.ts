import { CasbinService } from '@letscollab/nest-casbin';
import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly casbin: CasbinService) {}

  async addRole(role: CreateRoleDto) {
    await this.casbin.e.addPolicy(
      role.name,
      'letscollab.deskbtm.com',
      'demo',
      'read',
    );

    await this.casbin.e.addRoleForUser(
      'letscollabtest',
      role.name,
      'letscollab.deskbtm.com',
    );
    // console.log(await this.casbin.e);

    // this.authzService.addRoleForUser();
  }

  async deleteRole(role: string) {}
}
