import { UserRepository } from './user.repository';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  JwtSignDto,
  LocalSignInDto,
  SignupDto,
  UserResDto,
} from '@letscollab/helper';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ResultCode } from '@letscollab/helper';
import { MAIL_RMQ, AUTH_RMQ } from '../app.constants';
import { catchError, lastValueFrom, timeout } from 'rxjs';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository,

    @Inject(AUTH_RMQ)
    private readonly authClient: ClientProxy,

    @Inject(MAIL_RMQ)
    private readonly mailClient: ClientProxy,

    private readonly logger: Logger,
  ) {}

  async onModuleInit() {
    await this.authClient.connect().catch((err) => {
      this.logger.error(err.message, err.stack);
    });
  }

  async demo(header: string) {
    let r = await lastValueFrom<JwtSignDto>(
      this.authClient.send({ cmd: 'auth' }, { Authorization: header }).pipe(
        timeout(4000),
        catchError((e) => {
          this.logger.error(e);
          throw new InternalServerErrorException({
            message: 'token生成失败',
          });
        }),
      ),
    );
  }

  public async signup(body: SignupDto): Promise<UserResDto> {
    const user = await this.userRepo.findByUsername(body.username);

    if (user) {
      return {
        code: ResultCode.ERROR,
        message: '该用户/邮箱已经注册',
      };
    } else {
      return this.userRepo
        .createUser(body)
        .then(async (d) => {
          let result: any = d;

          let r = await lastValueFrom<JwtSignDto>(
            this.authClient
              .send({ cmd: 'sign' }, { username: d.username })
              .pipe(
                timeout(4000),
                catchError((e) => {
                  this.logger.error(e);
                  throw new InternalServerErrorException({
                    message: 'token生成失败',
                  });
                }),
              ),
          );

          if (r.code > 0) {
            result.t = r.d;
            console.log(result);
          }

          return {
            code: ResultCode.SUCCESS,
            message: '注册成功',
            d: result,
          };
        })
        .catch((err) => {
          this.logger.error(err.message, err.stack);

          throw new BadRequestException({
            code: ResultCode.ERROR,
            message: err.code === 'ER_DUP_ENTRY' ? '用户已存在' : err.message,
          });
        });
    }
  }

  /**
   *
   *
   * @param username
   * @param full  是否获取完整用户信息 包含密码
   * @returns
   */
  public async getUser(username: string, full = false) {
    const user = await this.userRepo[
      full ? 'findFullByUsername' : 'findByUsername'
    ](username).catch((err) => {
      this.logger.error(err.message, err.stack);

      throw new RpcException({
        code: ResultCode.ERROR,
        message: err.message,
      });
    });

    return {
      code: user ? ResultCode.SUCCESS : ResultCode.ERROR,
      d: user,
    };
  }
}
