import { AccessActions, UseAccess } from '@indiebase/nest-accesscontrol';
import { ResultCode } from '@indiebase/sdk';
import {
  AccessGuard,
  ApiPresetParam,
  ApiUnionResponse,
  ApiUnionType1Header,
  data,
  ManagerResources,
  PublicApiGuard,
  QueryEx,
  User,
} from '@indiebase/server-shared';
import { type PrimitiveHacker } from '@indiebase/trait';
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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PasetoAuthGuard } from '../../auth';
import {
  CreateOrgDTO,
  HackerOwnedOrgsDTO,
  OrgDTO,
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
    summary: 'Query the user-owned organizations',
    description: 'Query the user-owned organizations',
  })
  @ApiUnionResponse('paginated', OrgDTO)
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  // @UseAccess({
  //   [ManagerResources.orgs]: [AccessActions.readOwn],
  // })
  @Get('orgs')
  async queryOwnedOrgs(
    @User() hacker: PrimitiveHacker,
    @QueryEx()
    query: HackerOwnedOrgsDTO,
  ) {
    const result = await this.orgsService.list(hacker, query);
    return data({
      code: ResultCode.SUCCESS,
      // ...result,
    });
  }

  @ApiOperation({
    summary: 'Query organizations for the authenticated user',
    description:
      'Lists organizations that the authenticated user has explicit permission (:read, :write, or :admin) to access. ',
  })
  @ApiPresetParam('org', 'publish')
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @UseAccess({
    [ManagerResources.orgs]: [AccessActions.readAny],
  })
  @Get('orgs/query/:org')
  async query(@Param('org') org: string, @User() hacker: PrimitiveHacker) {
    const result = await this.orgsService.query(org, hacker);

    return result;
  }

  @ApiOperation({
    summary: 'Create an organization',
    description:
      'Different than create a project. Create an organization will not create the postgresql schema',
  })
  @ApiUnionResponse('created')
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard)
  @Post('orgs')
  async createOrganization(@Body() body: CreateOrgDTO, @User() hacker: PrimitiveHacker) {
    await this.orgsService.create(hacker, body);

    return data({
      code: ResultCode.SUCCESS,
      message: `${body.name} created successfully`,
    });
  }

  @ApiOperation({
    summary: 'Update an organization',
  })
  @ApiPresetParam('org', 'publish')
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @Patch('orgs/:org')
  async updateOrganization(
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
    summary: 'Hide an organization',
    description: 'Soft delete',
  })
  @ApiPresetParam('org', 'publish')
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @UseAccess({
    [ManagerResources.orgs]: [AccessActions.deleteOwn, AccessActions.deleteAny],
  })
  @Delete('orgs/:org')
  async deleteOrganization(@Param('org') org: string) {
    await this.orgsService.softDelete(org);

    return data({
      code: ResultCode.SUCCESS,
      message: `${org} deleted successfully`,
    });
  }

  @ApiOperation({
    summary: 'Delete an organization permanently',
    description:
      'Nota bene, Once you delete a org, there is no going back. Please be certain.',
  })
  @ApiPresetParam('org', 'publish')
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @UseAccess({
    [ManagerResources.orgs]: [AccessActions.deleteOwn, AccessActions.deleteAny],
  })
  @Delete('orgs/:org/permanent')
  async deletePermanent(@Param('org') org: string) {
    await this.orgsService.delete(org);

    return data({
      code: ResultCode.SUCCESS,
      message: `${org} deleted successfully`,
    });
  }
}
