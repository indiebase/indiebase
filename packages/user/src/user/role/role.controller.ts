import { Controller, Post, Body, Patch, Get, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto, DeleteRoleDto, UpdateRoleDto } from './role.dto';

@Controller('v1/user/role')
@ApiTags('v1/Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new role',
  })
  @ApiCookieAuth('SID')
  async create(@Body() role: CreateRoleDto) {
    return this.roleService.create({
      name: role.name,
      description: role.description,
    });
  }

  @Get()
  @ApiOperation({
    summary: 'Get role list',
  })
  @ApiCookieAuth('SID')
  async getList(@Body() role: CreateRoleDto) {
    // return this.roleService.addRole(role);
  }

  @Patch()
  @ApiOperation({
    summary: 'Update a role',
  })
  async update(@Body() role: UpdateRoleDto) {}

  @Delete()
  @ApiOperation({
    summary: 'Delete a role',
  })
  async delete(@Body() role: DeleteRoleDto) {}

  @Post(':roleId/:userId')
  @ApiCookieAuth('SID')
  @ApiOperation({ summary: 'Attach a role to user' })
  // @UseGuards(Http2RmqAuthGuard)
  async attachRole2User() {
    return 1;
  }
}
