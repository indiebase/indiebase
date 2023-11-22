import { GetCaptchaDTO } from './mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CaptchaUtils } from '@indiebase/server-shared';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Logger } from '@nestjs/common';
import type { Redis } from 'ioredis';
import { ResultCode } from '@indiebase/trait';
@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly logger: Logger,
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  public async sendCaptchaEmail(body: GetCaptchaDTO) {
    const captcha = Math.random().toString().slice(2, 7);
    const subject = 'Captcha';

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
          CaptchaUtils.getSignupCaptchaToken(captcha, body.username),
          3e3,
          captcha,
        );

        return {
          code: ResultCode.SUCCESS,
          message: 'Send Successfully',
        };
      })
      .catch((e) => {
        this.logger.error(e);
        throw new InternalServerErrorException();
      });
  }
}
