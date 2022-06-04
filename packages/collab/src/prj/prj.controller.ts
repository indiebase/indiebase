import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PrjService } from './prj.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  CreatePrjDto,
  DeletePrjDto,
  QueryPrjDto,
  UpdatePrjDto,
} from './prj.dto';
import { QueryTeamResDto } from 'src/team/team.dto';

@Controller('prj')
@ApiTags('v1/Project')
export class PrjController {
  constructor(private readonly prjService: PrjService) {}

  @Get('query')
  @ApiBearerAuth('jwt')
  @ApiOkResponse({
    type: QueryTeamResDto,
  })
  // @UseGuards(Http2RmqAuthGuard)
  async queryUsers(@Query() query: QueryPrjDto) {
    return this.prjService.queryPrj(query);
  }

  @Post('create')
  @ApiBearerAuth('jwt')
  // @UseGuards(Http2RmqAuthGuard)
  async createTeam(@Body() body: CreatePrjDto) {
    return this.prjService.createPrj(body);
  }

  @Put('update')
  @ApiBearerAuth('jwt')
  // @UseGuards(Http2RmqAuthGuard)
  async updateTeam(@Body() body: UpdatePrjDto) {
    return this.prjService.updatePrj(body);
  }

  @Delete('delete')
  @ApiBearerAuth('jwt')
  // @UseGuards(Http2RmqAuthGuard)
  async deleteTeam(@Body() body: DeletePrjDto) {
    return this.prjService.deletePrj(body);
  }
}
