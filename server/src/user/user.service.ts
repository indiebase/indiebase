import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultCode } from '@letscollab-nest/helper';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { QueryUserDto } from './user.dto';
import { CasbinService } from '@letscollab-nest/accesscontrol';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly logger: Logger,
    private readonly casbin: CasbinService,
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
      .addSelect('user.githubAccessToken')
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
    } else {
      // Update github access token per login.
      if (user.githubAccessToken !== body.githubAccessToken) {
        await this.updateUser(
          { id: user.id },
          { githubAccessToken: body.githubAccessToken },
        );
      }
    }

    return user;
  }

  public async updateUser(
    cond: { id?: number; username?: string },
    data: Partial<UserEntity>,
  ) {
    const user = await this.userRepo.findOne({ where: cond });
    const userEntity = this.userRepo.create({ ...user, ...data });

    await this.userRepo.save(userEntity).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: 'Update profile failed',
      });
    });
  }

  public async getUserPossession(username: string, domains: string[]) {
    return this.casbin.e.getImplicitPermissionsForUser(username, ...domains);
  }

  public async getUsers(cond: QueryUserDto) {
    const { pageSize, current, ...rest } = cond;

    const [list, total] = await this.userRepo.findAndCount({
      where: rest,
      skip: (current - 1) * pageSize,
      take: pageSize,
    });
    return {
      list,
      total,
    };
  }

  /**
   *
   *
   * @param cond Find condition
   * @returns
   */
  public async getUser(
    cond: Partial<UserEntity>,
    option: { full?: boolean } = {},
  ) {
    const { full = false } = option;

    const result = full
      ? this.findOneFull(cond)
      : this.userRepo.findOne({
          where: cond,
        });

    return result.catch((err) => {
      this.logger.error(err.message, err.stack);

      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: err.message,
      });
    });
  }
}
