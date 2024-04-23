import { ResultCode } from '@indiebase/sdk';
import {
  AccessGuard,
  ApiUnionResponse,
  ApiUnionType1Header,
  data,
  Project,
  PublicApiGuard,
} from '@indiebase/server-shared';
import { PrimitiveProject } from '@indiebase/trait/mgr';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { MgrAuthService } from './mgr-auth.service';
import { PasetoAuthGuard } from '../../auth';

@Controller({ path: 'mgr/auth', version: '1' })
@ApiTags('Manager-Auth/v1')
export class MgrAuthController {
  constructor(private readonly authService: MgrAuthService) {}
  @ApiOperation({
    summary: 'Get auth providers',
  })
  @ApiUnionResponse('pagination')
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @Get('providers')
  async getAuthzProviders(@Project() project: PrimitiveProject) {
    const result = await this.authService.getAuthProviders(project);
    return data({
      code: ResultCode.SUCCESS,
      data: result,
    });
  }
}
