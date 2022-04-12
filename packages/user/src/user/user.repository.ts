import { SignupDto } from '@letscollab/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(body) {
    const userEntity = this.create(body);
    await this.save(userEntity);
  }

  async findByAccount(user: SignupDto) {
    return this.findOne({
      account: user.account,
    });
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
