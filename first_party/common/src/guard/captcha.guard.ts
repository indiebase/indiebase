import { SignupDto } from '../dto/auth.dto';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import type { Redis } from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { FastifyRequest } from 'fastify';
import { Captcha } from '../utils';

@Injectable()
export class CaptchaGuard implements CanActivate {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const body = request.body as SignupDto;
    const { captcha, account } = body;
    const key = Captcha.getSignupCaptchaToken(captcha, account);
    const c = await this.redis.get(key);

    if (c) {
      await this.redis.del(key);
      return true;
    } else {
      throw new BadRequestException({ message: '验证码错误或失效' });
    }
  }
}
