import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrgsService } from './orgs.service';
import {
  PublicApiGuard,
  OkResSchema,
  ApiExceptionResponse,
} from '@indiebase/server-shared';
import { ResultCode } from '@indiebase/trait';
import { CreateOrgDto, UpdateOrgDto } from './orgs.dto';
import { AccessGuard } from '@indiebase/nest-casl';
import { PasetoAuthGuard } from '~/auth/paseto.guard';
import { did } from '@deskbtm/gadgets';

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
  @ApiOkResponse({
    type: OkResSchema,
  })
  @ApiExceptionResponse()
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
  @ApiOkResponse({
    type: OkResSchema,
  })
  // @UseGuards(PasetoAuthGuard, AccessGuard)
  @ApiBearerAuth('paseto')
  @Post()
  async create(@Body() body: CreateOrgDto) {
    await this.orgsService.create(body);

    return { code: ResultCode.SUCCESS, message: 'Created successfully' };
  }

  @ApiOperation({
    summary: 'Update an organization',
  })
  @ApiOkResponse({
    type: OkResSchema,
  })
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @Patch()
  async update(@Body() body: UpdateOrgDto) {
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
  @Delete(':org')
  async delete(@Param('org') org: string) {
    return { code: ResultCode.SUCCESS, message: 'Created successfully' };
  }
}
