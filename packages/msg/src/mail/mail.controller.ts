import { Body, Controller, Post, OnModuleInit } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCaptchaDto } from './mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
@ApiTags('v1/mail')
export class MailController implements OnModuleInit {
  constructor(private readonly mailService: MailService) {}

  onModuleInit() {
    console.log('========================== Init');
  }

  @Post('send-captcha')
  async sendCaptcha(@Body() body: GetCaptchaDto) {
    this.mailService.sendCaptchaEmail(body);
  }
}
