import { FastifyRequest } from 'fastify';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiCookieAuth,
  ApiOperation,
} from '@nestjs/swagger';
import {
  CreateOrgDto,
  DeleteOrgDto,
  QueryOrgDto,
  QueryOrgResDto,
  UpdateOrgDto,
} from './org.dto';
import {
  AccessGuard,
  MyInfo,
  ProtectGuard,
  ResultCode,
} from '@letscollab-nest/helper';
import { UseAccess, AccessAction } from '@letscollab-nest/accesscontrol';
import { OrgResource, UserResource } from '@letscollab-nest/trait';
import { OrgService } from './org.service';
import { CoProtectGuard } from '../../utils';

@Controller({
  path: 'org',
  version: '1',
})
@ApiTags('v1/Organization')
export class OrgController {
  constructor(private readonly orgService: OrgService) {}

  @Get('list')
  @ApiCookieAuth('SID')
  @ApiOkResponse({
    type: QueryOrgResDto,
  })
  async queryOrgs(@Query() query: QueryOrgDto, @Req() req: FastifyRequest) {
    return;
  }

  @ApiOperation({
    summary: 'Fetch github orgs',
  })
  @Get('github')
  @ApiCookieAuth('SID')
  async githubOrgs() {
    // return this.org.getGithubOrgs();
  }

  @Get(':name')
  @ApiCookieAuth('SID')
  @UseGuards(CoProtectGuard, AccessGuard)
  @ApiOperation({
    summary: 'Get a organization',
  })
  @UseAccess({
    action: AccessAction.readAny,
    resource: UserResource.list,
  })
  async getOrg(@Param('name') username: string) {}

  @ApiOperation({
    summary: 'Create a letscollab organization',
  })
  @Post()
  @ApiCookieAuth('SID')
  @UseGuards(ProtectGuard, AccessGuard)
  @UseAccess({
    action: AccessAction.createAny,
    resource: OrgResource.list,
  })
  async createOrg(@Body() body: CreateOrgDto, @MyInfo('id') id: number) {
    await this.orgService.createOrg(body, id);

    return { code: ResultCode.SUCCESS, message: 'Created successfully' };
  }

  @ApiOperation({
    summary: 'Update a letscollab organization',
  })
  @Put()
  @ApiCookieAuth('SID')
  async updateOrg(@Body() body: UpdateOrgDto) {
    // return this.org.updateOrg(body);
  }

  @ApiOperation({
    summary: 'Delete a letscollab organization',
  })
  @Delete(':name')
  @ApiCookieAuth('SID')
  @UseGuards(CoProtectGuard, AccessGuard)
  @UseAccess({
    action: AccessAction.deleteAny,
    resource: OrgResource.list,
  })
  // @UseGuards(Http2RmqAuthGuard)
  async deleteOrg(@Body() body: DeleteOrgDto) {
    // return this.org.deleteOrg(body);
  }
}
