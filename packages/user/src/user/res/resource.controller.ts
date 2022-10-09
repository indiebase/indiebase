import {
  ResultCode,
  RpcSessionAuthClientGuard,
  UserResource,
} from '@letscollab/helper';
import { AccessAction, UseAccess } from '@letscollab/nest-acl';
import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiCookieAuth,
  ApiHeader,
} from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { createResources } from './resources';

@Controller('v1/user/res')
@ApiTags('v1/Resources')
export class ResourceController {
  @Get()
  @ApiOperation({
    summary: 'Get resource list',
  })
  @ApiCookieAuth('SID')
  @UseGuards(RpcSessionAuthClientGuard)
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
