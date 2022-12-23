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
  Inject,
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
import { AccessGuard, DevApiHeader, ResultCode } from '@letscollab-nest/helper';
import { UseAccess, AccessAction } from '@letscollab-nest/accesscontrol';
import { RoleResource } from '@letscollab-nest/trait';

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
  async getList(@Query() role: QueryRoleDto) {}

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
