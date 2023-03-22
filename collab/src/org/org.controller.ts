import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiCookieAuth } from '@nestjs/swagger';

@Controller({
  path: 'org',
  version: '1',
})
@ApiTags('v1/Organization')
export class OrgController {
  constructor() {}

  //TODO
  @Get('list')
  @ApiCookieAuth('SID')
  @ApiOkResponse({})
  async queryOrgs() {
    return;
  }
}
