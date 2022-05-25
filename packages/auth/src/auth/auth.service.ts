import { USER_RMQ } from '../app.constants';
import {
  LocalSignInDto,
  RpcResSchema,
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

  async getUser<T>(cmd: string, c: any) {
    return lastValueFrom<T>(
      this.userClient.send({ cmd }, c).pipe(
        timeout(4000),
        catchError((e) => {
          throw new InternalServerErrorException({
            message: '获取用户信息失败',
          });
        }),
      ),
    );
  }

  async validateUser(info: LocalSignInDto) {
    let user = await this.getUser<RpcResSchema<UserDto & { password: string }>>(
      'get_full_user',
      info.username,
    );

    if (user.code > 0) {
      if (await bcrypt.compare(info.password, user.d.password)) {
        return user.d;
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
        catchError((e) => {
          this.logger.error(e);
          throw new InternalServerErrorException({ message: '用户注册失败' });
        }),
      ),
    );

    if (r.code > 0) {
      let t = await this.signTarget({ username: r.d.username });
      r.d.t = t;
    }

    return r;
  }

  async signin(username) {
    const r = await this.getUser<RpcResSchema<UserDto>>('get_user', username);

    if (r.code > 0) {
      let t = await this.signTarget({ username: r.d.username });
      r.d.t = t;
    }

    return r;
  }

  async signTarget(object: string | Buffer | object) {
    return this.jwtService.sign(object);
  }

  isCaptchaExpire() {}
}
