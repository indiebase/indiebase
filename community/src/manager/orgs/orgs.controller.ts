import { AccessActions, UseAccess } from '@indiebase/nest-accesscontrol';
import {
  AccessGuard,
  ApiIndiebaseSecurity,
  ApiUnionResponse,
  ManagerResources,
  PublicApiGuard,
} from '@indiebase/server-shared';
import { ResultCode } from '@indiebase/trait';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
import { CreateOrgDTO, UpdateOrgDTO } from './orgs.dto';
import { OrgsService } from './orgs.service';

@Controller({
  path: 'mgr',
  version: '1',
})
@ApiTags('Organizations/v1')
export class OrgsController {
  constructor(private readonly orgsService: OrgsService) {}

  @ApiOperation({
    summary: 'List organizations',
    description: 'List all organizations',
  })
  @ApiUnionResponse('pagination')
  @ApiIndiebaseSecurity()
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @Get('orgs')
  async list() {
    const result = await this.orgsService.list();
    // if (err) {
    //   throw new InternalServerErrorException();
    // }
    return result;
  }

  @ApiOperation({
    summary: 'Create an organization',
  })
  @ApiUnionResponse()
  @ApiIndiebaseSecurity()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard)
  @Post('orgs')
  async create(@Body() body: CreateOrgDTO) {
    await this.orgsService.create(body);

    return { code: ResultCode.SUCCESS, message: 'Create successfully' };
  }

  @ApiOperation({
    summary: 'Update an organization',
  })
  @ApiUnionResponse()
  @ApiIndiebaseSecurity()
  @ApiBearerAuth('paseto')
  @Patch('orgs/:org')
  async update(@Body() body: UpdateOrgDTO) {
    await this.orgsService.update(body);

    return { code: ResultCode.SUCCESS, message: 'Create successfully' };
  }

  @ApiOperation({
    summary: 'Delete an organization',
  })
  @ApiParam({
    name: 'org',
    type: 'string',
    schema: {
      default: 'indiebase',
    },
  })
  @ApiUnionResponse()
  @ApiIndiebaseSecurity()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @UseAccess({
    [ManagerResources.orgs]: [AccessActions.deleteOwn, AccessActions.deleteAny],
  })
  @Delete('orgs/:org')
  async delete(@Param('org') org: string) {
    await this.orgsService.delete(org);

    return { code: ResultCode.SUCCESS, message: 'Delete successfully' };
  }
}
