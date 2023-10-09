import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { OrgsService } from './orgs.service';
import { PublicApiGuard, ResSchema } from '@indiebase/server-shared';
import { ResultCode } from '@indiebase/trait';
import { CreateOrgDto, UpdateOrgDto } from './orgs.dto';
import { AccessGuard } from '@indiebase/nest-casl';
import { PasetoAuthGuard } from '~/auth/paseto.guard';

@Controller({
  path: 'mgr/orgs',
  version: '1',
})
@ApiTags('Organizations/v1')
export class OrgsController {
  constructor(private readonly orgsService: OrgsService) {}

  @ApiOkResponse({
    type: ResSchema,
  })
  @ApiOperation({
    summary: 'Create an organization',
    description: 'Creating an organization will create a postgresql schema',
  })
  // @UseGuards(PasetoAuthGuard, AccessGuard)
  @ApiBearerAuth('paseto')
  @Post()
  async create(@Body() body: CreateOrgDto) {
    await this.orgsService.restCreate(body);

    return { code: ResultCode.SUCCESS, message: 'Created successfully' };
  }

  @ApiOperation({
    summary: 'Update an organization',
  })
  @ApiOkResponse({
    type: ResSchema,
  })
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard)
  @UseGuards(PasetoAuthGuard, AccessGuard)
  @Patch()
  async update(@Body() body: UpdateOrgDto) {
    // await this.orgsService.create(body);

    return { code: ResultCode.SUCCESS, message: 'Created successfully' };
  }
}
