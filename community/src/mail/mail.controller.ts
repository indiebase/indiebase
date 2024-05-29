import { ResultCode } from '@indiebase/sdk';
import {
  ApiUnionResponse,
  ApiUnionType1Header,
  data,
  Project,
  PublicApiGuard,
} from '@indiebase/server-shared';
import { PrimitiveProject } from '@indiebase/trait';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PasetoAuthGuard } from '../auth/paseto.guard';
import { SendCaptchaDTO } from './mail.dto';
import { MailService } from './mail.service';

@Controller({
  path: 'mail',
  version: '1',
})
@ApiTags('Mail/v1')
export class MailController {
  constructor(private readonly mail: MailService) {}

  @ApiOperation({
    summary: 'Send a captcha through email',
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard)
  @Post('send-captcha')
  async sendCaptcha(
    @Body() body: SendCaptchaDTO,
    @Project() project: PrimitiveProject,
  ) {
    await this.mail.sendCaptcha(body, project);

    return data({
      code: ResultCode.SUCCESS,
      message: 'Send successfully',
    });
  }

  @ApiOperation({
    summary: 'Broadcast emails',
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard)
  @Post('broadcast')
  async broadcast(
    @Body() body: SendCaptchaDTO,
    @Project() project: PrimitiveProject,
  ) {
    return data({
      code: ResultCode.SUCCESS,
      message: 'Send successfully',
    });
  }
}
