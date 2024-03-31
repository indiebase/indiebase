import { ApiUnionResponse } from '@indiebase/server-shared';
import { ResultCode } from '@indiebase/trait';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

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
  @ApiUnionResponse()
  // @UseGuards(PasetoAuthGuard, AccessGuard)
  @ApiBearerAuth('paseto')
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
  @Post('orgs')
  async create(@Body() body: CreateOrgDTO) {
    await this.orgsService.create(body);

    return { code: ResultCode.SUCCESS, message: 'Created successfully' };
  }

  @ApiOperation({
    summary: 'Update an organization',
  })
  @ApiUnionResponse()
  @Patch('orgs/:org')
  async update(@Body() body: UpdateOrgDTO) {
    await this.orgsService.update(body);

    return { code: ResultCode.SUCCESS, message: 'Created successfully' };
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
  @ApiBearerAuth('paseto')
  @Delete('orgs/:org')
  async delete(@Param('org') org: string) {
    return { code: ResultCode.SUCCESS, message: 'Created successfully' };
  }
}
