import { CommProtectGuard } from '../../utils';
import { AccessGuard, DevApiHeader, ResultCode } from '@letscollab-nest/helper';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { createResources } from './resources';
import { AccessAction, UseAccess } from '@letscollab-nest/accesscontrol';
import { RoleResource } from '@letscollab-nest/trait';

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
  @UseGuards(CommProtectGuard, AccessGuard)
  @UseAccess({
    action: AccessAction.readAny,
    resource: RoleResource.list,
  })
  @DevApiHeader()
  async getResources(@I18n() i18n: I18nContext) {
    return {
      code: ResultCode.SUCCESS,
      d: createResources(i18n),
    };
  }
}
