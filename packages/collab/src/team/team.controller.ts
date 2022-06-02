import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Http2RmqAuthGuard } from 'src/guard/rmq-auth.guard';
import {
  CreateTeamDto,
  DeleteTeamDto,
  InviteMemberDto,
  QueryTeamDto,
  QueryTeamResDto,
  UpdateTeamDto,
} from './team.dto';
import { IVerify } from '@letscollab/helper';

@Controller('team')
@ApiTags('v1/Team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @MessagePattern({ cmd: 'get_name' })
  async getUser(@Payload() username: string) {}

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

  @Post('invite')
  @ApiBearerAuth('jwt')
  @UseGuards(Http2RmqAuthGuard)
  async inviteMember(
    @Body() body: InviteMemberDto,
    @Req() req: { user: IVerify },
  ) {
    return this.teamService.inviteMember(body, req.user.body);
  }

  @Get('invite/confirm')
  @ApiBearerAuth('jwt')
  @UseGuards(Http2RmqAuthGuard)
  async confirmInviteMember(@Body() body: UpdateTeamDto) {
    return this.teamService.updateTeam(body);
  }

  @Delete('delete')
  @ApiBearerAuth('jwt')
  // @UseGuards(Http2RmqAuthGuard)
  async deleteTeam(@Body() body: DeleteTeamDto) {
    return this.teamService.deleteTeam(body);
  }
}
