import { GetCaptchaDto } from './mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Captcha, ResultCode } from '@letscollab/helper';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Logger } from '@nestjs/common';
import type { Redis } from 'ioredis';
@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly logger: Logger,
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  public async sendCaptchaEmail(body: GetCaptchaDto) {
    const captcha = parseInt(Math.random().toString().slice(2, 7));
    const subject = '注册验证';

    return this.mailerService
      .sendMail({
        to: body.username,
        subject,
        template: 'mail-captcha.hbs',
        context: {
          captcha,
          subject,
          addition: '',
        },
      })
      .then(async () => {
        await this.redis.setex(
          Captcha.getSignupCaptchaToken(captcha, body.username),
          3000,
          captcha,
        );

        return {
          code: ResultCode.SUCCESS,
          message: '发送成功',
        };
      })
      .catch((e) => {
        this.logger.error(e);
        throw new InternalServerErrorException();
      });
  }
}
