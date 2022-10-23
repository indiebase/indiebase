import {
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AUTH_RMQ, ResultCode, RpcResSchemaDto } from '@letscollab/helper';
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

  public async signIn(
    body: Omit<UserEntity, 'id' | 'updateTime' | 'createTime' | 'hashPassword'>,
  ): Promise<RpcResSchemaDto> {
    let user = await this.userRepo.findOne({
      where: [
        {
          username: body.username,
        },
        {
          email: body.email,
        },
      ],
    });

    if (!user) {
      user = await this.createUser(body).catch((err) => {
        this.logger.error(err.message, err.stack);

        throw new RpcException({
          code: ResultCode.ERROR,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            err.code === 'ER_DUP_ENTRY' ? 'User existed' : 'Fail to register',
        });
      });
    }

    return {
      code: ResultCode.SUCCESS,
      message: 'Login Successfully',
      d: user,
    };
  }

  public async updateUser(
    cond: { id?: number; username?: string },
    data: Partial<UserEntity>,
  ) {
    const e = await this.userRepo.findOne({ where: cond });
    const userEntity = this.userRepo.create({ ...e, ...data });

    await this.userRepo.save(userEntity).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: 'Update profile failed',
      });
    });
    return {
      code: ResultCode.SUCCESS,
    };
  }

  /**
   *
   *
   * @param cond Find condition
   * @param option  rpc: Is rpc, full: Get complete user information that includes password.
   * @returns
   */
  public async getUser(
    cond: Partial<UserEntity>[],
    option: { full?: boolean; rpc?: boolean } = {},
  ) {
    const { full = false, rpc = false } = option;

    const promise = full
      ? this.findOneFull(cond)
      : this.userRepo.findOne({
          where: cond,
        });

    const user = await promise.catch((err) => {
      this.logger.error(err.message, err.stack);

      if (rpc) {
        throw new RpcException({
          code: ResultCode.ERROR,
          message: err.message,
        });
      } else {
        throw new InternalServerErrorException({
          code: ResultCode.ERROR,
          message: err.message,
        });
      }
    });

    return {
      code: user ? ResultCode.SUCCESS : ResultCode.ERROR,
      d: user,
    };
  }
}
