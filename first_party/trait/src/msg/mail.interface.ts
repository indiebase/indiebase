import type { GetCaptchaDto } from './mail.dto';

export interface SendCaptcha extends GetCaptchaDto {
  template: string;
  subject: string;
  addition?: string;
}
