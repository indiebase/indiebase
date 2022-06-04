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
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateOrgDto,
  DeleteOrgDto,
  QueryOrgDto,
  QueryOrgResDto,
  UpdateOrgDto,
} from './org.dto';

@Controller('team')
@ApiTags('v1/Team')
export class OrgController {
  constructor(private readonly orgService: OrgService) {}

  @Get('query')
  @ApiBearerAuth('jwt')
  @ApiOkResponse({
    type: QueryOrgResDto,
  })
  // @UseGuards(Http2RmqAuthGuard)
  async queryUsers(@Query() query: QueryOrgDto) {
    return this.orgService.queryTeam(query);
  }

  @Post('create')
  @ApiBearerAuth('jwt')
  // @UseGuards(Http2RmqAuthGuard)
  async createTeam(@Body() body: CreateOrgDto) {
    return this.orgService.createTeam(body);
  }

  @Put('update')
  @ApiBearerAuth('jwt')
  // @UseGuards(Http2RmqAuthGuard)
  async updateTeam(@Body() body: UpdateOrgDto) {
    return this.orgService.updateTeam(body);
  }

  @Delete('delete')
  @ApiBearerAuth('jwt')
  // @UseGuards(Http2RmqAuthGuard)
  async deleteTeam(@Body() body: DeleteOrgDto) {
    return this.orgService.deleteTeam(body);
  }
}
