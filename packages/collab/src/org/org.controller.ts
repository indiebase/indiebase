import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { OrgService } from './org.service';
import { ApiOkResponse, ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import {
  CreateOrgDto,
  DeleteOrgDto,
  QueryOrgDto,
  QueryOrgResDto,
  UpdateOrgDto,
} from './org.dto';

@Controller('v1/org')
@ApiTags('v1/Organization')
export class OrgController {
  constructor(private readonly orgService: OrgService) {}

  @Get('list')
  @ApiCookieAuth('SID')
  @ApiOkResponse({
    type: QueryOrgResDto,
  })
  async queryOrgs(@Query() query: QueryOrgDto) {
    return this.orgService.queryOrg(query);
  }

  @Post()
  @ApiCookieAuth('SID')
  async createOrg(@Body() body: CreateOrgDto) {
    return this.orgService.createOrg({
      name: body.name,
      description: body.description,
      contactEmail: body.contactEmail,
    });
  }

  @Put()
  @ApiCookieAuth('SID')
  async updateOrg(@Body() body: UpdateOrgDto) {
    return this.orgService.updateOrg(body);
  }

  @Delete()
  @ApiCookieAuth('SID')
  // @UseGuards(Http2RmqAuthGuard)
  async deleteTeam(@Body() body: DeleteOrgDto) {
    return this.orgService.deleteOrg(body);
  }
}
