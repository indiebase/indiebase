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
import { UserInfo } from '@letscollab/helper';
import { OctokitService } from '@letscollab/nest-octokit';

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
    // return this.orgService.queryOrg(query);
    console.log(req.session.user);
    return;
  }

  @Get('github/list')
  @ApiCookieAuth('SID')
  @ApiOperation({
    summary: 'Fetch github orgs',
  })
  async githubOrgs(@Query() query: QueryOrgDto, @Req() req: FastifyRequest) {
    // return this.orgService.queryOrg(query);
    console.log(req.session.user);
    return;
  }

  @Post()
  @ApiCookieAuth('SID')
  async createOrg(@Body() body: CreateOrgDto, @UserInfo() info) {
    return this.org.createOrg({
      name: body.name,
      // description: body.description,
      // contactEmail: body.contactEmail,
    });
  }

  @Put()
  @ApiCookieAuth('SID')
  async updateOrg(@Body() body: UpdateOrgDto) {
    return this.org.updateOrg(body);
  }

  @Delete()
  @ApiCookieAuth('SID')
  // @UseGuards(Http2RmqAuthGuard)
  async deleteTeam(@Body() body: DeleteOrgDto) {
    return this.org.deleteOrg(body);
  }
}
