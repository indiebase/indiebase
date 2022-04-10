import { UserRegisterDto } from './dto/user.dto';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(body: UserRegisterDto) {
    const userEntity = this.create(body);
    await this.save(userEntity);
  }

  async findBy() {}
}
