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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
    summary: 'Send captcha through email',
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @UseGuards(PublicApiGuard)
  @Post('send-captcha')
  async sendCaptcha(
    @Body() body: SendCaptchaDTO,
    @Project() project: PrimitiveProject,
  ) {
    console.log('--------------');
    await this.mail.sendCaptcha(body);

    return data({
      code: ResultCode.SUCCESS,
      message: 'Send successfully',
    });
  }

  @ApiOperation({
    summary: 'Send captcha through email',
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @UseGuards(PublicApiGuard)
  @Post('broadcast')
  async broadcast(
    @Body() body: SendCaptchaDTO,
    @Project() project: PrimitiveProject,
  ) {
    await this.mail.sendCaptcha(body);

    return data({
      code: ResultCode.SUCCESS,
      message: 'Send successfully',
    });
  }
}
