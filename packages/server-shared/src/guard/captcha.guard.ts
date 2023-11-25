import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import type { Redis } from 'ioredis';
import { InjectRedis } from '@indiebase/nestjs-redis';
import { FastifyRequest } from 'fastify';
import { CaptchaUtils } from '../utils';

@Injectable()
export class CaptchaGuard implements CanActivate {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    if (process.env.NODE_ENV === 'development') {
      return true;
    }

    const body = request.body as any;
    const { captcha, username } = body;
    const key = CaptchaUtils.getSignupCaptchaToken(captcha, username);
    const c = await this.redis.get(key);

    if (c) {
      await this.redis.del(key);
      return true;
    } else {
      throw new BadRequestException({ message: '验证码错误或失效' });
    }
  }
}
