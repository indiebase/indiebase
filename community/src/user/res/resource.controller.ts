import { CoProtectGuard } from '../../utils';
import { AccessGuard, DevApiHeader, ResultCode } from '@letscollab-nest/helper';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { createResources } from './resources';

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
  @UseGuards(CoProtectGuard, AccessGuard)
  @DevApiHeader()
  async getResources(@I18n() i18n: I18nContext) {
    return {
      code: ResultCode.SUCCESS,
      d: createResources(i18n),
    };
  }
}
