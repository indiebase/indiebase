import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCaptchaDto } from './mail.dto';
import { MailService } from './mail.service';

@Controller({
  path: 'mail',
  version: '1',
})
@ApiTags('v1/Mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-captcha')
  async sendCaptcha(@Body() body: GetCaptchaDto) {
    return this.mailService.sendCaptchaEmail(body);
  }
}
