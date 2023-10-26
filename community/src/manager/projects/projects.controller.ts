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
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { OkResponseSchema } from '@indiebase/server-shared';
import { ResultCode } from '@indiebase/trait';
import { CreatePrjDto } from './projects.dto';
import { AccessGuard } from '@indiebase/nest-casl';
import { PasetoAuthGuard } from '../../auth/paseto.guard';

@Controller({
  path: 'mgr',
  version: '1',
})
@ApiTags('Projects/v1')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({
    summary: 'List projects',
    description: 'List all public projects',
  })
  @ApiOkResponse({
    type: OkResponseSchema,
  })
  @UseGuards(PasetoAuthGuard, AccessGuard)
  @ApiBearerAuth('paseto')
  @Get('orgs/:org/projects')
  async list() {}

  @ApiOkResponse({
    type: OkResponseSchema,
  })
  @ApiOperation({
    summary: 'List projects for the authenticated user',
    description:
      'Lists repositories that the authenticated user has explicit permission (:read, :write, or :admin) to access. ',
  })
  @UseGuards(PasetoAuthGuard, AccessGuard)
  @ApiBearerAuth('paseto')
  @Get('user/projects')
  async listForUser() {}

  @ApiOkResponse({
    type: OkResponseSchema,
  })
  @ApiOperation({
    summary: 'Create a project',
    description:
      'Creating a project will create a postgresql schema and template tables',
  })
  // @UseGuards(PasetoAuthGuard, AccessGuard)
  @ApiBearerAuth('paseto')
  @Post('orgs/:org/projects')
  async create(@Body() body: CreatePrjDto, @Param('org') org: string) {
    await this.projectsService.create(org, body);

    return { code: ResultCode.SUCCESS, message: 'Created successfully' };
  }

  @ApiParam({
    name: 'project',
    type: 'string',
    schema: {
      default: 'indiebase',
    },
  })
  @ApiBearerAuth('paseto')
  @Delete('projects/:project')
  async delete(@Param('project') project: string) {
    return { code: ResultCode.SUCCESS, message: 'Created successfully' };
  }
}
