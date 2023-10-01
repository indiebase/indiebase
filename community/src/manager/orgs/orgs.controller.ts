import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { OrgsService } from './orgs.service';
import { PublicApiGuard, BaseResSchemaDto } from '@indiebase/server-shared';
import { OrgResource, ResultCode } from '@indiebase/trait';
import { CreateOrgDto } from './orgs.dto';

@Controller({
  path: 'mgr/orgs',
  version: '1',
})
@ApiTags('Organizations/v1')
export class OrgsController {
  constructor(private readonly orgsService: OrgsService) {}

  @ApiOperation({
    summary: 'Create an organization',
  })
  @Post()
  @ApiCookieAuth('SID')
  @UseGuards(PublicApiGuard)
  @ApiOkResponse({
    type: BaseResSchemaDto,
  })
  async createOrg(@Body() body: CreateOrgDto) {
    await this.orgsService.create(body);

    return { code: ResultCode.SUCCESS, message: 'Created successfully' };
  }
}
