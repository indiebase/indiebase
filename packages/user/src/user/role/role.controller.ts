import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiCookieAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { RoleService } from './role.service';
import {
  AttachRole2UserDto,
  CreateRoleDto,
  DeleteRoleDto,
  QueryRoleDto,
  QueryRolesResDto,
  UpdateRoleDto,
} from './role.dto';
import {
  RoleResource,
  RpcSessionAuthzClientGuard,
  TestApiHeader,
} from '@letscollab/helper';
import { UseAccess, AccessAction } from '@letscollab/nest-ac';

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
    return this.roleService.createRole(role);
  }

  @Get('list')
  @ApiOperation({
    summary: 'Get role list',
  })
  @ApiCreatedResponse({
    type: QueryRolesResDto,
  })
  @ApiCookieAuth('SID')
  async getList(@Query() role: QueryRoleDto) {
    return this.roleService.queryRoles(role);
  }

  @Patch()
  @ApiOperation({
    summary: 'Update a role',
  })
  async update(@Body() role: UpdateRoleDto) {
    return this.roleService.updateRole(role);
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete a role',
  })
  async delete(@Body() role: DeleteRoleDto) {
    return this.roleService.deleteRole(role.id);
  }

  @Post('attach')
  @ApiCookieAuth('SID')
  @ApiOperation({ summary: 'Attach a role to user' })
  @UseGuards(RpcSessionAuthzClientGuard)
  @TestApiHeader()
  @UseAccess({
    action: AccessAction.createAny,
    resource: RoleResource.list,
  })
  async attachRole2User(@Body() body: AttachRole2UserDto) {
    return this.roleService.attachRole(body);
  }
}
