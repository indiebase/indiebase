import { UseAccess } from '@indiebase/nest-accesscontrol';
import { ResultCode } from '@indiebase/sdk';
import {
  AccessGuard,
  ApiUnionResponse,
  ApiUnionType1Header,
  data,
  Project,
  PublicApiGuard,
  User,
} from '@indiebase/server-shared';
import { PrimitiveHacker, PrimitiveProject } from '@indiebase/trait';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
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
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @Get('orgs/:org/projects')
  async list() {}

  @ApiOperation({
    summary: 'Query projects for the authenticated user',
    description:
      'Lists projects that the authenticated user has explicit permission (:read, :write, or :admin) to access. ',
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @Get('user/projects')
  async listForUser() {}

  @ApiOperation({
    summary: 'Create a project',
    description:
      'Creating a project will create a postgresql schema and template tables',
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @UseAccess({})
  @UsePipes(
    new ValidationPipe({
      transform: true,
      errorHttpStatusCode: HttpStatus.CONFLICT,
    }),
  )
  @Post('orgs/:org/projects')
  async create(
    @Body() body: CreatePrjDTO,
    @Param('org') org: string,
    @User() hacker: PrimitiveHacker,
  ) {
    await this.projectsService.create(hacker, org, body);

    return data({ code: ResultCode.SUCCESS, message: 'Create successfully' });
  }

  @ApiOperation({
    summary: 'Delete a project permanently',
  })
  @ApiParam({
    name: 'referenceId',
    type: 'string',
    schema: {
      default: 'publish',
    },
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @Delete('projects/:referenceId/permanent')
  async delete(
    @Param('referenceId') referenceId: string,
    @User() hacker: PrimitiveHacker,
  ) {
    await this.projectsService.delete(referenceId, hacker);

    return data({ code: ResultCode.SUCCESS, message: 'Delete successfully' });
  }

  @ApiOperation({
    summary: 'Setup a project email configurations',
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @UseGuards(PublicApiGuard, PasetoAuthGuard)
  @Put('settings/mail')
  async preferencesEmail(@Project() project: PrimitiveProject) {
    return data({
      code: ResultCode.SUCCESS,
      message: 'Send successfully',
    });
  }
}
