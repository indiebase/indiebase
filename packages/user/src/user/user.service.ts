import { UserRepository } from './user.repository';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ResultCode } from '@letscollab/helper';
import { AUTH_RMQ } from '../app.constants';
import { catchError, lastValueFrom, timeout } from 'rxjs';
import { UserResDto } from './user.dto';
import { JwtSignResDto } from '@letscollab/auth';
import { FindUserCond } from './user.interface';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository,

    @Inject(AUTH_RMQ)
    private readonly authClient: ClientProxy,

    private readonly logger: Logger,
  ) {}

  public async signup(
    body: Omit<UserEntity, 'id' | 'updateTime' | 'createTime' | 'hashPassword'>,
  ): Promise<UserResDto> {
    const user = await this.userRepo.findOne({
      where: [
        {
          username: body.username,
        },
        {
          email: body.email,
        },
      ],
    });

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

          let r = await lastValueFrom<JwtSignResDto>(
            this.authClient
              .send({ cmd: 'sign' }, { username: d.username })
              .pipe(
                timeout(4000),
                catchError((e) => {
                  this.logger.error(e);
                  throw new Error('注册成功，Token生成失败');
                }),
              ),
          );

          if (r.code > 0) {
            result.t = r.d;
          }

          return {
            code: ResultCode.SUCCESS,
            message: '注册成功',
            d: result,
          };
        })
        .catch((err) => {
          this.logger.error(err.message, err.stack);

          throw new InternalServerErrorException({
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
  public async getUser(cond: FindUserCond, full = false) {
    const user = await this.userRepo[full ? 'findFull' : 'findOne'](cond).catch(
      (err) => {
        this.logger.error(err.message, err.stack);

        throw new RpcException({
          code: ResultCode.ERROR,
          message: err.message,
        });
      },
    );

    return {
      code: user ? ResultCode.SUCCESS : ResultCode.ERROR,
      d: user,
    };
  }
}
