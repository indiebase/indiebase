import { RoleService } from './role.service';
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
import {
  AttachRole2UserDto,
  CreateRoleDto,
  DeleteRoleDto,
  QueryRoleDto,
  QueryRolesResDto,
  UpdateRoleDto,
} from './role.dto';
import { AccessGuard, DevApiHeader } from '@letscollab/server-shared';
import { AccessAction, UseAccess } from '@letscollab-nest/casbin';
import { ResultCode, RoleResource } from '@letscollab/trait';
import { PublicApiGuard } from '@letscollab/server-shared';

@Controller({
  path: 'user/role',
  version: '1',
})
@ApiTags('v1/Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new role',
  })
  @UseAccess({
    action: AccessAction.createAny,
    resource: RoleResource.list,
  })
  @ApiCookieAuth('SID')
  async create(@Body() role: CreateRoleDto) {
    await this.roleService.createRole(role);

    return {
      code: ResultCode.SUCCESS,
      message: 'Create successfully',
    };
  }

  @Get('list')
  @ApiOperation({
    summary: 'Get role list',
  })
  @ApiCreatedResponse({
    type: QueryRolesResDto,
  })
  @UseGuards(PublicApiGuard, AccessGuard)
  @ApiCookieAuth('SID')
  async getList(@Query() role: QueryRoleDto) {
    const { total, pageSize, pageIndex, d } = await this.roleService.queryRoles(
      role,
    );
    return {
      code: ResultCode.SUCCESS,
      total,
      pageSize,
      pageIndex,
      d,
    };
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

  @Post('attach')
  @ApiCookieAuth('SID')
  @ApiOperation({ summary: 'Attach a role to user' })
  @UseGuards(AccessGuard)
  @DevApiHeader()
  // @UseAccess({
  //   action: AccessAction.createAny,
  //   resource: RoleResource.list,
  // })
  async attachRole2User(@Body() body: AttachRole2UserDto) {
    await this.roleService.attachRole2User(body);
    return {
      code: ResultCode.SUCCESS,
      message: 'Success',
    };
  }
}
