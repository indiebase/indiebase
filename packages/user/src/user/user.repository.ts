import { SignupDto } from '@letscollab/helper';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(body: SignupDto) {
    return new Promise(async (resolve, reject) => {
      const userEntity = this.create(body);

      this.save(userEntity)
        .then((r) => {
          delete r.password;
          resolve(r);
        })
        .catch(reject);
    });
  }

  public async findByAccount(account: string) {
    return this.findOne({
      account,
    });
  }

  public async findFullByAccount(account: string) {
    return this.createQueryBuilder('user')
      .addSelect('user.password')
      .where({ account })
      .getOne();
  }

  public async updateUser(body) {
    const { username, ...rest } = body;
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
