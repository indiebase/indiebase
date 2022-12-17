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
import {
  AUTH_RMQ,
  RpcSessionAuthzClientGuard,
  InternalTestApiHeader,
} from '@letscollab-nest/helper';
import { UseAccess, AccessAction } from '@letscollab-nest/accesscontrol';
import { RoleResource } from '@letscollab-nest/trait';
import { ClientProxy } from '@nestjs/microservices';

@Controller({
  path: 'user/role',
  version: '1',
})
@ApiTags('v1/Role')
export class RoleController {
  constructor(
    @Inject(AUTH_RMQ)
    private readonly authClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new role',
  })
  @ApiCookieAuth('SID')
  async create(@Body() role: CreateRoleDto) {}

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
  @UseGuards(RpcSessionAuthzClientGuard)
  @InternalTestApiHeader()
  @UseAccess({
    action: AccessAction.createAny,
    resource: RoleResource.list,
  })
  async attachRole2User(@Body() body: AttachRole2UserDto) {}
}
