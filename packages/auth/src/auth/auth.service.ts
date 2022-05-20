import { USER_RMQ } from '../app.constants';
import { Captcha, SignupDto } from '@letscollab/helper';
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { AvailableUserInfo } from './auth.interface';
import { lastValueFrom, timeout } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(USER_RMQ)
    private readonly userClient: ClientProxy,

    private readonly logger: Logger,

    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  async onModuleInit() {
    await this.userClient.connect().catch((err) => {
      console.log(err);
    });
  }

  async validateUser(info: AvailableUserInfo): Promise<any> {}

  async signup(user: SignupDto): Promise<any> {
    const { captcha, account } = user;
    const result = await lastValueFrom(
      this.userClient.send({ cmd: 'signup' }, user).pipe(timeout(4000)),
    );
  }

  async signTarget(object: string | Buffer | object) {
    return this.jwtService.sign(object);
  }

  isCaptchaExpire() {}
}
