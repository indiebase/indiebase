import { SignupDto } from '@letscollab/helper';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(body: SignupDto): Promise<UserEntity> {
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

  public async findByUsername(username: string) {
    return this.findOne({
      username,
    });
  }

  public async findFullByUsername(username: string) {
    return this.createQueryBuilder('user')
      .addSelect('user.password')
      .where({ username })
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
