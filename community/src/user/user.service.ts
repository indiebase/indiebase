import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpResSchemaDto, ResultCode } from '@letscollab-nest/helper';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
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

  private async findOneFull(cond: any) {
    return this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where(cond)
      .getOne();
  }

  public async signIn(
    body: Omit<UserEntity, 'id' | 'updateTime' | 'createTime' | 'hashPassword'>,
  ) {
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

        throw new InternalServerErrorException({
          code: ResultCode.ERROR,
          message:
            err.code === 'ER_DUP_ENTRY' ? 'User existed' : 'Fail to register',
        });
      });
    }

    return user;
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
   * @returns
   */
  public async getUser(
    cond: Partial<UserEntity>[],
    option: { full?: boolean } = {},
  ) {
    const { full = false } = option;

    const promise = full
      ? this.findOneFull(cond)
      : this.userRepo.findOne({
          where: cond,
        });

    const user = await promise.catch((err) => {
      this.logger.error(err.message, err.stack);

      throw new InternalServerErrorException({
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
