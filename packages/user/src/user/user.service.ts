import { SignupType } from './user.enum';
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
    let result: UserResDto;

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
      switch (user.signupType) {
        case SignupType.github:
          result = {
            code: ResultCode.SUCCESS,
          };
          break;
        default:
          result = {
            code: ResultCode.EENTEXIST,
            message: '该用户/邮箱已经注册',
          };
          break;
      }
    } else {
      const created = await this.userRepo.createUser(body).catch((err) => {
        this.logger.error(err.message, err.stack);

        throw new InternalServerErrorException({
          code: ResultCode.ERROR,
          message: err.code === 'ER_DUP_ENTRY' ? '用户已存在' : err.message,
        });
      });

      result = {
        code: ResultCode.SUCCESS,
        message: '注册成功',
        d: created,
      };
    }

    return result;
  }

  public async getSign(data: {}) {
    return await lastValueFrom<JwtSignResDto>(
      this.authClient.send({ cmd: 'sign' }, data).pipe(
        timeout(4000),
        catchError((e) => {
          this.logger.error(e);
          throw new Error('注册成功，Token生成失败');
        }),
      ),
    );
  }

  /**
   *
   *
   * @param username
   * @param full  Get complete user information that includes password.
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
