import { AccessActions, UseAccess } from '@indiebase/nest-accesscontrol';
import { ResultCode } from '@indiebase/sdk';
import {
  AccessGuard,
  ApiUnionResponse,
  ApiUnionType1Header,
  data,
  ManagerResources,
  PublicApiGuard,
  User,
} from '@indiebase/server-shared';
import { PrimitiveHacker } from '@indiebase/trait';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import {
  CreateOrgDTO,
  HackerOwnedOrgsDTO,
  UpdateOrgDTO,
  UpdateOrgParamsDTO,
} from './orgs.dto';
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
  async queryOwned(
    @User() hacker: PrimitiveHacker,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    query: HackerOwnedOrgsDTO,
  ) {
    const result = await this.orgsService.list(hacker, query);
    return data({
      code: ResultCode.SUCCESS,
      ...result,
    });
  }

  @ApiOperation({
    summary: 'Query the organizations',
    description: 'Query the user-owned organizations',
  })
  @ApiParam({
    name: 'org',
    type: 'string',
    schema: {
      default: 'publish',
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
    // const result = await this.orgsService.list();
    // return result;
  }

  @ApiOperation({
    summary: 'Create an organization',
    description:
      'Different than create a project. Create an organization will not create the postgresql schema',
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard)
  @Post('orgs')
  async create(@Body() body: CreateOrgDTO, @User() hacker: PrimitiveHacker) {
    await this.orgsService.create(hacker, body);

    return data({
      code: ResultCode.SUCCESS,
      message: `${body.name} created successfully`,
    });
  }

  @ApiOperation({
    summary: 'Update an organization',
  })
  @ApiParam({
    name: 'org',
    type: 'string',
    schema: {
      default: 'publish',
    },
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @Patch('orgs/:org')
  async update(
    @Param(new ValidationPipe())
    params: UpdateOrgParamsDTO,
    @Body() body: UpdateOrgDTO,
  ) {
    const { org } = params;
    await this.orgsService.update(org, body);

    return data({
      code: ResultCode.SUCCESS,
      message: `Organization ${org} profile updated successfully`,
    });
  }

  @ApiOperation({
    summary: 'Delete an organization',
    description: 'Soft delete',
  })
  @ApiParam({
    name: 'org',
    type: 'string',
    schema: {
      default: 'publish',
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
    await this.orgsService.softDelete(org);

    return data({
      code: ResultCode.SUCCESS,
      message: `${org} deleted successfully`,
    });
  }
}
