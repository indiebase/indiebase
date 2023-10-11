import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { ResSchema } from '@indiebase/server-shared';
import { ResultCode } from '@indiebase/trait';
import { CreatePrjDto } from './projects.dto';
import { did } from '@deskbtm/gadgets';

@Controller({
  path: 'mgr/orgs',
  version: '1',
})
@ApiTags('Projects/v1')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOkResponse({
    type: ResSchema,
  })
  @ApiOperation({
    summary: 'Create a project',
    description:
      'Creating a project will create a postgresql schema and template tables',
  })
  // @UseGuards(PasetoAuthGuard, AccessGuard)
  @ApiBearerAuth('paseto')
  @Post(':org/projects')
  async create(@Body() body: CreatePrjDto, @Param('org') org: string) {
    await this.projectsService.create(org, body);

    return { code: ResultCode.SUCCESS, message: 'Created successfully' };
  }
}
