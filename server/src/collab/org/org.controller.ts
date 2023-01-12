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
  UpdateOrgDto,
} from './org.dto';
import {
  AccessGuard,
  BaseResSchemaDto,
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

  //TODO
  @Get('list')
  @ApiCookieAuth('SID')
  @ApiOkResponse({})
  async queryOrgs(@Query() query: QueryOrgDto, @Req() req: FastifyRequest) {
    return;
  }

  @ApiOperation({
    summary: 'Fetch github orgs',
  })
  @Get('github')
  @UseGuards(CoProtectGuard, AccessGuard)
  @ApiCookieAuth('SID')
  async githubOrgs() {
    const d = await this.orgService.getGithubOwnOrgs();
    return {
      code: ResultCode.SUCCESS,
      d,
    };
  }

  @ApiOperation({
    summary: 'Fetch github orgs',
  })
  @Get('github/:name')
  @UseGuards(CoProtectGuard, AccessGuard)
  @ApiCookieAuth('SID')
  async githubOrg(@Param('name') name: string) {
    const d = await this.orgService.getGithubOrg(name);
    return {
      code: ResultCode.SUCCESS,
      d,
    };
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
    summary: 'Create an organization',
  })
  @Post()
  @ApiCookieAuth('SID')
  @UseGuards(ProtectGuard, AccessGuard)
  @UseAccess({
    action: AccessAction.createAny,
    resource: OrgResource.list,
  })
  @ApiOkResponse({
    type: BaseResSchemaDto,
  })
  async createOrg(@Body() body: CreateOrgDto, @MyInfo('id') id: number) {
    await this.orgService.createOrg(body, id);

    return { code: ResultCode.SUCCESS, message: 'Created successfully' };
  }

  //TODO
  @ApiOperation({
    summary: 'Update an owned organization',
  })
  @Put()
  @ApiCookieAuth('SID')
  @UseGuards(CoProtectGuard, AccessGuard)
  async updateOrg(@Body() body: UpdateOrgDto) {}

  //TODO
  @ApiOperation({
    summary: 'Delete an owned organization',
  })
  @Delete(':name')
  @ApiCookieAuth('SID')
  @UseGuards(CoProtectGuard, AccessGuard)
  @UseAccess({
    action: AccessAction.deleteAny,
    resource: OrgResource.list,
  })
  async deleteOrg(@Body() body: DeleteOrgDto) {}
}
