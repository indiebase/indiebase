import { UserEntity } from './model/user.entity';
import { Controller, Get, Provide, Inject } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { RabbitMQProvider } from './user.provider';

@Provide()
@Controller()
export class UserController {
  @Inject()
  rabbitMQProvider: RabbitMQProvider;

  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;

  @Get('/login')
  async login() {
    console.log(this.userRepo.create({ username: 'demo', password: 'dede' }));
    await this.userRepo.save(
      this.userRepo.create({ username: 'demo', password: 'dede' }),
    );

    return 'demo';
  }
}
