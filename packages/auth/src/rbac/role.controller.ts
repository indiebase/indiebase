import { Controller, Post, Body } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto } from './role.dto';
import { Roles } from '@letscollab/nest-casbin';

@Controller('role')
@ApiTags('v1/Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  @ApiProperty({
    description: 'Create a new role',
  })
  @Roles({ name: 'demo' })
  async create(@Body() role: CreateRoleDto) {
    console.log(role);
    this.roleService.addRole(role);
    // const data: Role = Object.assign(
    //   {
    //     id: uuidv4(),
    //   },
    //   role,
    // );
    // return this.roleSrv.addRole(data);
  }

  @Post('query')
  @ApiProperty({
    description: 'Create a new role',
  })
  async query(@Body() role: CreateRoleDto) {
    // const data: Role = Object.assign(
    //   {
    //     id: uuidv4(),
    //   },
    //   role,
    // );
    // return this.roleSrv.addRole(data);
  }
}
