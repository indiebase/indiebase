import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCaptchaDto } from './mail.dto';
import { MailService } from './mail.service';

@Controller('v1/msg/mail')
@ApiTags('v1/mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-captcha')
  async sendCaptcha(@Body() body: GetCaptchaDto) {
    this.mailService.sendCaptchaEmail(body);
  }
}
