import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto } from './role.dto';
import { Roles, RolesGuard } from '@letscollab/nest-casbin';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('role')
@ApiTags('v1/Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  @ApiProperty({
    description: 'Create a new role',
  })
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles({ name: 'demo' })
  async create(@Body() role: CreateRoleDto) {
    return this.roleService.addRole(role);
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
