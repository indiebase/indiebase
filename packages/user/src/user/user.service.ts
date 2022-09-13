import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ResultCode, RpcResSchemaDto } from '@letscollab/helper';
import { AUTH_RMQ } from '../app.constants';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,

    @Inject(AUTH_RMQ)
    private readonly authClient: ClientProxy,

    private readonly logger: Logger,
  ) {}

  private async createUser(
    body: Omit<UserEntity, 'id' | 'updateTime' | 'createTime'>,
  ): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      const userEntity = this.userRepo.create(body);

      this.userRepo
        .save(userEntity)
        .then((r) => {
          delete r.password;

          resolve(r);
        })
        .catch(reject);
    });
  }

  private async findOneFull(cond) {
    return this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where(cond)
      .getOne();
  }

  public async signup(
    body: Omit<UserEntity, 'id' | 'updateTime' | 'createTime' | 'hashPassword'>,
  ): Promise<RpcResSchemaDto> {
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
        code: ResultCode.EENTEXIST,
        httpStatus: 400,
        message: 'username/email already registered',
      };
    } else {
      const created = await this.createUser(body).catch((err) => {
        this.logger.error(err.message, err.stack);

        throw new RpcException({
          code: ResultCode.ERROR,
          message: err.code === 'ER_DUP_ENTRY' ? 'User existed' : err,
        });
      });

      return {
        code: ResultCode.SUCCESS,
        message: 'Register Success',
        d: created,
      };
    }
  }

  /**
   *
   *
   * @param username
   * @param full  Get complete user information that includes password.
   * @returns
   */
  public async getUser(cond: any[], full = false) {
    const promise = full
      ? this.findOneFull(cond)
      : this.userRepo.findOne({
          where: cond,
        });

    const user = await promise.catch((err) => {
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
