import { AccessAction, UseAccess } from '@letscollab-nest/accesscontrol';
import { AccessGuard, MyInfo, ResultCode } from '@letscollab-nest/helper';
import { ProjectResource } from '@letscollab-nest/trait';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { CommProtectGuard } from '../../utils';
import {
  CreateProjectDto,
  DeleteProjectDto,
  // ProjectListResDto,
  QueryProjectDto,
  UpdateProjectDto,
} from './project.dto';
import { ProjectService } from './project.service';

@Controller({
  version: '1',
  path: 'project',
})
@ApiTags('v1/Project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  //TODO
  @Get('list')
  @ApiCookieAuth('SID')
  @ApiOperation({
    summary: 'Get project list',
  })
  @UseGuards(CommProtectGuard, AccessGuard)
  @ApiOkResponse({
    // type: ProjectListResDto,
  })
  async getProjects(@Query() query: QueryProjectDto) {
    const { total, pageSize, pageIndex, d } =
      await this.projectService.queryProjects(query);
    return {
      code: ResultCode.SUCCESS,
      total,
      pageSize,
      pageIndex,
      d,
    };
  }

  @Post()
  @ApiOperation({
    summary: 'Create a project',
  })
  @ApiCookieAuth('SID')
  @UseGuards(CommProtectGuard, AccessGuard)
  @UseAccess({
    action: AccessAction.createAny,
    resource: ProjectResource.list,
  })
  async createProject(
    @Body() body: CreateProjectDto,
    @MyInfo('id') id: number,
  ) {
    await this.projectService.createProject(body, id);

    return { code: ResultCode.SUCCESS, message: 'Created Successfully' };
  }

  @ApiOperation({
    summary: 'Fetch github projects from specified organization',
  })
  @Get('github/search')
  @UseGuards(CommProtectGuard, AccessGuard)
  @ApiCookieAuth('SID')
  async searchGithubRepo(@Query('q') q) {
    const d = await this.projectService.searchGithubRepo(q);

    return {
      code: ResultCode.SUCCESS,
      total: d.total_count,
      d: d.items,
    };
  }

  //TODO
  @Put()
  @ApiCookieAuth('SID')
  async updatePrj(@Body() body: UpdateProjectDto) {}

  //TODO
  @Delete()
  @ApiCookieAuth('SID')
  @UseGuards(CommProtectGuard, AccessGuard)
  @UseAccess({
    action: AccessAction.deleteOwn,
    resource: ProjectResource.list,
  })
  async deletePrj(@Body() body: DeleteProjectDto) {}
}
