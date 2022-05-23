import { USER_RMQ } from '../app.constants';
import {
  LocalSignInDto,
  SignupDto,
  UserDto,
  UserResDto,
} from '@letscollab/helper';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, timeout } from 'rxjs';
import * as bcrypt from 'bcrypt';

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
      this.logger.error(err.message, err.stack);
    });
  }

  async validateUser(info: LocalSignInDto): Promise<UserDto> {
    let user = await lastValueFrom<UserDto & { password: string }>(
      this.userClient
        .send({ cmd: 'full_user' }, { account: info.account })
        .pipe(
          timeout(4000),
          catchError(() => {
            throw new InternalServerErrorException({
              message: '获取用户信息失败',
            });
          }),
        ),
    );

    if (user?.password) {
      if (await bcrypt.compare(info.password, user.password)) {
        return user;
      } else {
        throw new UnauthorizedException('用户认证错误, 请重新输入密码');
      }
    } else {
      throw new NotFoundException('用户不存在, 请先注册');
    }
  }

  async signup(user: SignupDto): Promise<UserResDto> {
    let r = await lastValueFrom<UserResDto>(
      this.userClient.send({ cmd: 'signup' }, user).pipe(
        timeout(4000),
        catchError(() => {
          throw new InternalServerErrorException({ message: '用户注册失败' });
        }),
      ),
    );

    if (r.code > 0) {
      let t = await this.signTarget({ account: r.d.account });
      r.d.t = t;
    }

    return r;
  }

  async signTarget(object: string | Buffer | object) {
    return this.jwtService.sign(object);
  }

  isCaptchaExpire() {}
}
