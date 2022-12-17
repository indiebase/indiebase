import {
  ResultCode,
  RpcSessionAuthzClientGuard,
} from '@letscollab-nest/helper';
import { AccessAction, UseAccess } from '@letscollab-nest/accesscontrol';
import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiCookieAuth,
  ApiHeader,
} from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { createResources } from './resources';
import { UserResource } from '@letscollab-nest/trait';

@Controller({
  path: 'user/res',
  version: '1',
})
@ApiTags('v1/Resource')
export class ResourceController {
  @Get()
  @ApiOperation({
    summary: 'Get resource list',
  })
  @ApiCookieAuth('SID')
  @UseGuards(RpcSessionAuthzClientGuard)
  @UseAccess({
    action: AccessAction.readAny,
    resource: UserResource.list,
  })
  @ApiHeader({
    name: 'Package-Name',
    description: 'The product package name, same as domain',
  })
  async getResources(@I18n() i18n: I18nContext) {
    return {
      code: ResultCode.SUCCESS,
      d: createResources(i18n),
    };
  }
}
