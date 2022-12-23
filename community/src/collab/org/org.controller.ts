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
import { MyInfo } from '@letscollab-nest/helper';

@Controller('v1/collab/org')
@ApiTags('v1/Organization')
export class OrgController {
  constructor() {}

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
    // return this.org.getGithubOrgs();
  }

  @ApiOperation({
    summary: 'Create a letscollab organization',
  })
  @Post()
  @ApiCookieAuth('SID')
  async createOrg(@Body() body: CreateOrgDto, @MyInfo() info) {
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
    // return this.org.updateOrg(body);
  }

  @ApiOperation({
    summary: 'Delete a letscollab organization',
  })
  @Delete()
  @ApiCookieAuth('SID')
  // @UseGuards(Http2RmqAuthGuard)
  async deleteTeam(@Body() body: DeleteOrgDto) {
    // return this.org.deleteOrg(body);
  }
}
