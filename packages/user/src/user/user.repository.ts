import { SignupDto } from '@letscollab/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(body) {
    const userEntity = this.create(body);

    await this.save(userEntity);
  }

  public async findByAccount(account: string) {
    return this.findOne({
      account,
    });
  }

  public async updateUser(body) {
    const { username, ...rest } = body;

    // try {
    //   return this.adminRepo.update(
    //     {
    //       username,
    //     },
    //     rest,
    //   );
    // } catch (error) {
    //   throw new BadRequestException({ message: '修改失败' });
    // }
  }

  /**
   *
   * 通过名字查找会返回多个用户
   */
  async findByName(user: SignupDto) {
    return this.find({
      username: user.username,
    });
  }
}
