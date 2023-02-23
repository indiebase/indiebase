import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { CreateOrgDto, QueryOrgDto, UpdateOrgDto } from './org.dto';
import { AccessGuard, BaseResSchemaDto, MyInfo } from '@letscollab-nest/helper';
import { UseAccess, AccessAction } from '@letscollab-nest/accesscontrol';
import { OrgResource, ResultCode } from '@letscollab-nest/trait';
import { OrgService } from './org.service';
import { CommProtectGuard } from '../../utils';
import { QueryProjectsDto } from '../project/project.dto';

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
  async queryOrgs(@Query() query: QueryOrgDto) {
    return this.orgService.query(query);
  }

  @ApiOperation({
    summary: 'Fetch github organizations',
  })
  @Get('github')
  @UseGuards(CommProtectGuard, AccessGuard)
  @ApiCookieAuth('SID')
  async githubOrgs() {
    const d = await this.orgService.getGithubOwnOrgs();
    return {
      code: ResultCode.SUCCESS,
      d,
    };
  }

  @ApiOperation({
    summary: 'Fetch a github organization',
  })
  @Get('github/:name')
  @UseGuards(CommProtectGuard, AccessGuard)
  @ApiCookieAuth('SID')
  async githubOrg(@Param('name') name: string) {
    const d = await this.orgService.getGithubOrg(name);
    return {
      code: ResultCode.SUCCESS,
      d,
    };
  }

  @ApiOperation({
    summary: 'Fetch github organization repositories',
  })
  @Get('github/:name/repos')
  @UseGuards(CommProtectGuard, AccessGuard)
  @ApiCookieAuth('SID')
  async githubOrgProjects(@Param('name') name: string) {
    const d = await this.orgService.getGithubOrgRepos(name);
    return {
      code: ResultCode.SUCCESS,
      d,
    };
  }

  @ApiOperation({
    summary: 'Get an organization',
  })
  @Get(':name')
  @ApiCookieAuth('SID')
  @UseGuards(CommProtectGuard, AccessGuard)
  async getOrg(@Param('name') orgName: string) {
    const d = await this.orgService.get(orgName);
    return {
      code: ResultCode.SUCCESS,
      d,
    };
  }

  @ApiOperation({
    summary: 'Create an organization',
  })
  @Post()
  @ApiCookieAuth('SID')
  @UseGuards(CommProtectGuard, AccessGuard)
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

  @ApiOperation({
    summary: 'Create an organization',
  })
  @Get(':org/pinned_projects')
  @ApiCookieAuth('SID')
  @UseGuards(CommProtectGuard, AccessGuard)
  @ApiOkResponse({
    type: BaseResSchemaDto,
  })
  async getPinnedProjects(@Param('org') param) {
    const d = await this.orgService.getPinnedProjects(param);

    return { code: ResultCode.SUCCESS, message: 'Created successfully', d };
  }

  @ApiOperation({
    summary: 'Get organization projects',
  })
  @Get(':org/projects')
  @ApiCookieAuth('SID')
  @UseGuards(CommProtectGuard, AccessGuard)
  @ApiOkResponse({
    type: BaseResSchemaDto,
  })
  async getProjects(@Param('org') orgName, @Query() query: QueryProjectsDto) {
    const d = await this.orgService.getProjects({ orgName, ...query });

    return { code: ResultCode.SUCCESS, ...d };
  }

  @ApiOperation({
    summary: 'Update an owned organization',
  })
  @Put()
  @ApiCookieAuth('SID')
  @UseGuards(CommProtectGuard, AccessGuard)
  async updateOrg(@Body() body: UpdateOrgDto) {
    await this.orgService.updateOrg(body);

    return { code: ResultCode.SUCCESS, message: 'Update successfully' };
  }

  @ApiOperation({
    summary: 'Delete an owned organization',
    description: 'Require:org_list:deleteOwn',
  })
  @Delete(':name')
  @ApiParam({
    name: 'name',
    type: 'string',
  })
  @ApiCookieAuth('SID')
  @UseGuards(CommProtectGuard, AccessGuard)
  @UseAccess({
    action: AccessAction.deleteOwn,
    resource: OrgResource.list,
  })
  async deleteOrg(@Param('name') name) {
    await this.orgService.deleteOrg(name);

    return { code: ResultCode.SUCCESS, message: 'Delete successfully' };
  }
}
