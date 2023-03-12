import { AccessAction, UseAccess } from '@letscollab-nest/accesscontrol';
import { AccessGuard, MyInfo } from '@letscollab/server-shared';
import { ProjectResource, ResultCode } from '@letscollab/trait';
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
  ApiCookieAuth,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { CommProtectGuard } from '../utils';
import {
  CreateProjectDto,
  QueryProjectsDto,
  SearchGithubDto,
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
  async getProjects(@Query() query: QueryProjectsDto) {
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
  async searchGithubRepo(@Query() query: SearchGithubDto) {
    const d = await this.projectService.searchGithubRepo(query.q);

    return {
      code: ResultCode.SUCCESS,
      total: d.total_count,
      d: d.items,
    };
  }

  //TODO
  @Put()
  @ApiCookieAuth('SID')
  async updateProject(@Body() body: UpdateProjectDto) {}

  @ApiOperation({
    summary: 'Delete project',
  })
  @ApiParam({
    name: 'name',
    type: 'string',
    schema: {
      default: 'deskbtm',
    },
  })
  @Delete(':name')
  @ApiCookieAuth('SID')
  @UseGuards(CommProtectGuard, AccessGuard)
  @UseAccess({
    action: AccessAction.deleteAny,
    resource: ProjectResource.list,
  })
  async deleteProject(@Param('name') name: string) {
    await this.projectService.deleteProject(name);

    return {
      code: ResultCode.SUCCESS,
    };
  }
}
