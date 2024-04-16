import { AccessActions, UseAccess } from '@indiebase/nest-accesscontrol';
import { ResultCode } from '@indiebase/sdk';
import {
  AccessGuard,
  ApiUnionResponse,
  ApiUnionType1Header,
  data,
  ManagerResources,
  PublicApiGuard,
} from '@indiebase/server-shared';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { PasetoAuthGuard } from '../../auth';
import { CreateOrgDTO, UpdateOrgDTO, UpdateOrgParamsDTO } from './orgs.dto';
import { OrgsService } from './orgs.service';

@Controller({
  path: 'mgr',
  version: '1',
})
@ApiTags('Organizations/v1')
export class OrgsController {
  constructor(private readonly orgsService: OrgsService) {}

  @ApiOperation({
    summary: 'Query the user-owned all organizations',
    description: 'Query the user-owned all organizations',
  })
  @ApiUnionResponse('pagination')
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @UseAccess({
    [ManagerResources.orgs]: [AccessActions.readOwn],
  })
  @Get('orgs')
  async queryOwned() {
    const result = await this.orgsService.list();
    return result;
  }

  @ApiOperation({
    summary: 'Query the organizations',
    description: 'Query the user-owned organizations',
  })
  @ApiParam({
    name: 'org',
    type: 'string',
    schema: {
      default: 'indiebase',
    },
  })
  @ApiUnionResponse('pagination')
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @UseAccess({
    [ManagerResources.orgs]: [AccessActions.readAny],
  })
  @Get('orgs/query/:org')
  async query() {
    const result = await this.orgsService.list();
    return result;
  }

  @ApiOperation({
    summary: 'Create an organization',
    description:
      'Different than create a project. Create an organization will not create the postgresql schema',
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @UseAccess({
    [ManagerResources.orgs]: [AccessActions.createAny],
  })
  @Post('orgs')
  async create(@Body() body: CreateOrgDTO) {
    await this.orgsService.create(body);

    return data({ code: ResultCode.SUCCESS, message: 'Create successfully' });
  }

  @ApiOperation({
    summary: 'Update an organization',
  })
  @ApiParam({
    name: 'org',
    type: 'string',
    schema: {
      default: 'indiebase',
    },
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @Patch('orgs/:org')
  async update(
    @Param(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    params: UpdateOrgParamsDTO,
    @Body() body: UpdateOrgDTO,
  ) {
    const { org } = params;
    await this.orgsService.update(org, body);

    return data({ code: ResultCode.SUCCESS, message: 'Create successfully' });
  }

  @ApiOperation({
    summary: 'Delete an organization',
    description: 'Soft delete',
  })
  @ApiParam({
    name: 'org',
    type: 'string',
    schema: {
      default: 'indiebase',
    },
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @UseAccess({
    [ManagerResources.orgs]: [AccessActions.deleteOwn, AccessActions.deleteAny],
  })
  @Delete('orgs/:org')
  async delete(@Param('org') org: string) {
    await this.orgsService.delete(org);

    return data({ code: ResultCode.SUCCESS, message: 'Delete successfully' });
  }
}
