import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultCode } from '@letscollab-nest/helper';
import { UserEntity } from './user.entity';
import { Like, Repository } from 'typeorm';
import { QueryUserDto } from './user.dto';
import { CasbinService } from '@letscollab-nest/accesscontrol';

type CreateUserEntity = Omit<
  UserEntity,
  'id' | 'updateTime' | 'createTime' | 'hashPassword' | 'enabled2FA' | 'status'
>;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly logger: Logger,
    private readonly casbin: CasbinService,
  ) {}

  public get repo() {
    return this.userRepo;
  }

  private async createUser(body: CreateUserEntity): Promise<UserEntity> {
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

  public async signIn(body: CreateUserEntity) {
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
          message: 'Fail to register',
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

  // Fix update doesn't trigger @BeforeInsert() @BeforeUpdate()
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
    const { pageSize, current, username, email } = cond;
    const condition = [];
    username && condition.push({ username: Like(`%${username}%`) });
    email && condition.push({ email: Like(`%${email}%`) });

    if (condition.length < 1) {
      return { list: [], total: 0 };
    }
    const [list, total] = await this.userRepo.findAndCount({
      where: condition,
      skip: (current - 1) * pageSize,
      take: pageSize,
    });
    return {
      list,
      total,
    };
  }

  public async getOwnedOrganizations(id: number) {
    const user = await this.userRepo
      .findOne({
        where: { id },
        relations: ['organizations'],
      })
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException();
      });

    return user.organizations;
  }

  /**
   *
   *
   * @param cond Find condition
   * @returns
   */
  public async getUser(
    cond: Partial<UserEntity>,
    option: { full?: boolean } = { full: false },
  ) {
    const { full } = option;

    const result = full
      ? this.findOneFull(cond)
      : this.userRepo.findOne({
          where: cond as any,
        });

    return result.catch((err) => {
      this.logger.error(err.message, err.stack);

      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: err.message,
      });
    });
  }

  /**
   *
   *
   * @param cond Find condition
   * @returns
   */
  public async getProfile(id) {
    return this.userRepo
      .findOne({
        where: { id },
        relations: ['organizations'],
      })
      .catch((err) => {
        this.logger.error(err.message, err.stack);

        throw new InternalServerErrorException({
          code: ResultCode.ERROR,
          message: err.message,
        });
      });
  }
}
