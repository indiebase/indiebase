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
} from '@nestjs/swagger';
import {
  CreateOrgDto,
  DeleteOrgDto,
  QueryOrgDto,
  TransferOrgDto,
  UpdateOrgDto,
} from './org.dto';
import {
  AccessGuard,
  BaseResSchemaDto,
  MyInfo,
  ResultCode,
} from '@letscollab-nest/helper';
import { UseAccess, AccessAction } from '@letscollab-nest/accesscontrol';
import { OrgResource } from '@letscollab-nest/trait';
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
  async queryOrgs(@Query() query: QueryOrgDto) {
    return this.orgService.query(query);
  }

  @ApiOperation({
    summary: 'Fetch github organizations',
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
    summary: 'Fetch github organization',
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

  @ApiOperation({
    summary: 'Fetch github organization repositories',
  })
  @Get('github/:name/repos')
  @UseGuards(CoProtectGuard, AccessGuard)
  @ApiCookieAuth('SID')
  async githubOrgProjects(@Param('name') name: string) {
    const d = await this.orgService.getGithubOrgRepos(name);
    return {
      code: ResultCode.SUCCESS,
      d,
    };
  }

  @Get(':name')
  @ApiCookieAuth('SID')
  @UseGuards(CoProtectGuard, AccessGuard)
  @ApiOperation({
    summary: 'Get an organization',
  })
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
  @UseGuards(CoProtectGuard, AccessGuard)
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
  @UseGuards(CoProtectGuard, AccessGuard)
  @ApiOkResponse({
    type: BaseResSchemaDto,
  })
  async getProjects(@Param('org') param) {
    const d = await this.orgService.getPinnedProjects(param);

    return { code: ResultCode.SUCCESS, message: 'Created successfully', d };
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

  @ApiOperation({
    summary: 'Delete an owned organization',
  })
  // @Delete(':name')
  @ApiCookieAuth('SID')
  @UseGuards(CoProtectGuard, AccessGuard)
  @UseAccess({
    action: AccessAction.deleteAny,
    resource: OrgResource.list,
  })
  async transferOrg(@Body() body: TransferOrgDto) {}
}
