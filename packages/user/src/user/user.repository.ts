import { EntityRepository, Repository } from 'typeorm';
import { SignupDto } from './user.dto';
import { UserEntity } from './user.entity';
import { FindUserCond } from './user.interface';

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

  public async findFull(cond: FindUserCond) {
    return this.createQueryBuilder('user')
      .addSelect('user.password')
      .where(cond)
      .getOne();
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
