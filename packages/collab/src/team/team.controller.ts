import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateTeamDto,
  DeleteTeamDto,
  QueryTeamDto,
  QueryTeamResDto,
  UpdateTeamDto,
} from './team.dto';

@Controller('team')
@ApiTags('v1/Team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('query')
  @ApiBearerAuth('jwt')
  @ApiOkResponse({
    type: QueryTeamResDto,
  })
  // @UseGuards(Http2RmqAuthGuard)
  async queryUsers(@Query() query: QueryTeamDto) {
    return this.teamService.queryTeam(query);
  }

  @Post('create')
  @ApiBearerAuth('jwt')
  // @UseGuards(Http2RmqAuthGuard)
  async createTeam(@Body() body: CreateTeamDto) {
    return this.teamService.createTeam(body);
  }

  @Put('update')
  @ApiBearerAuth('jwt')
  // @UseGuards(Http2RmqAuthGuard)
  async updateTeam(@Body() body: UpdateTeamDto) {
    return this.teamService.updateTeam(body);
  }

  @Delete('delete')
  @ApiBearerAuth('jwt')
  // @UseGuards(Http2RmqAuthGuard)
  async deleteTeam(@Body() body: DeleteTeamDto) {
    return this.teamService.deleteTeam(body);
  }
}
