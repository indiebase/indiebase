import { ResultCode } from '@indiebase/sdk';
import {
  AccessGuard,
  ApiUnionResponse,
  ApiUnionType1Header,
  data,
  Project,
  PublicApiGuard,
} from '@indiebase/server-shared';
import { type PrimitiveProject } from '@indiebase/trait/mgr';
import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PasetoAuthGuard } from '../../auth';
import { MgrAuthService } from './mgr-auth.service';

@Controller({ path: 'mgr/auth', version: '1' })
@ApiTags('Manager-Auth/v1')
export class MgrAuthController {
  constructor(private readonly authService: MgrAuthService) {}

  @ApiOperation({
    summary: 'Get auth providers',
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @Get('providers')
  async getAuthProviders(@Project() project: PrimitiveProject) {
    const result = await this.authService.getAuthProviders(project);

    return data({
      code: ResultCode.SUCCESS,
      data: result,
    });
  }

  @ApiOperation({
    summary: 'Update auth providers',
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @Patch('providers')
  async updateAuthProviders(@Project() project: PrimitiveProject) {
    const result = await this.authService.getAuthProviders(project);

    return data({
      code: ResultCode.SUCCESS,
      data: result,
    });
  }
}
