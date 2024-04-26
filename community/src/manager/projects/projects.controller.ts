import { UseAccess } from '@indiebase/nest-accesscontrol';
import { ResultCode } from '@indiebase/sdk';
import {
  AccessGuard,
  ApiUnionResponse,
  ApiUnionType1Header,
  data,
  PublicApiGuard,
} from '@indiebase/server-shared';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { PasetoAuthGuard } from '../../auth';
import { CreatePrjDTO } from './projects.dto';
import { ProjectsService } from './projects.service';

@Controller({
  path: 'mgr',
  version: '1',
})
@ApiTags('Projects/v1')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({
    summary: 'Query projects',
    description: 'List all public projects',
  })
  @ApiUnionResponse()
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @ApiBearerAuth('paseto')
  @Get('orgs/:org/projects')
  async list() {}

  @ApiOperation({
    summary: 'Query projects for the authenticated user',
    description:
      'Lists repositories that the authenticated user has explicit permission (:read, :write, or :admin) to access. ',
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @ApiBearerAuth('paseto')
  @Get('user/projects')
  async listForUser() {}

  @ApiOperation({
    summary: 'Create a project',
    description:
      'Creating a project will create a postgresql schema and template tables',
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @ApiBearerAuth('paseto')
  @UseAccess({})
  @Post('orgs/:org/projects')
  async create(@Body() body: CreatePrjDTO, @Param('org') org: string) {
    await this.projectsService.create(org, body);

    return data({ code: ResultCode.SUCCESS, message: 'Create successfully' });
  }

  @ApiOperation({
    summary: 'Delete a project',
  })
  @ApiParam({
    name: 'project',
    type: 'string',
    schema: {
      default: 'publish',
    },
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @Delete('projects/:project')
  async delete(@Param('project') project: string) {
    return data({ code: ResultCode.SUCCESS, message: 'Delete successfully' });
  }
}
