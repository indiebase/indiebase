import { FastifyRequest } from 'fastify';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { OrgService } from './org.service';
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
import { UserInfo } from '@letscollab-nest/helper';
import { OctokitService } from '@letscollab-nest/octokit';

@Controller('v1/collab/org')
@ApiTags('v1/Organization')
export class OrgController {
  constructor(
    private readonly org: OrgService,
    private readonly octokit: OctokitService,
  ) {}

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
  @Get('github/list')
  @ApiCookieAuth('SID')
  async githubOrgs() {
    return this.org.getGithubOrgs();
  }

  @ApiOperation({
    summary: 'Create a letscollab organization',
  })
  @Post()
  @ApiCookieAuth('SID')
  async createOrg(@Body() body: CreateOrgDto, @UserInfo() info) {
    // return this.org.createOrg({
    //   name: body.name,
    //   // description: body.description,
    //   // contactEmail: body.contactEmail,
    // });
  }

  @ApiOperation({
    summary: 'Update a letscollab organization',
  })
  @Put()
  @ApiCookieAuth('SID')
  async updateOrg(@Body() body: UpdateOrgDto) {
    return this.org.updateOrg(body);
  }

  @ApiOperation({
    summary: 'Delete a letscollab organization',
  })
  @Delete()
  @ApiCookieAuth('SID')
  // @UseGuards(Http2RmqAuthGuard)
  async deleteTeam(@Body() body: DeleteOrgDto) {
    return this.org.deleteOrg(body);
  }
}
