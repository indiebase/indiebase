import { UserEntity } from '@/rbac/user';
import { Logger } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';
import { InjectEntityModel } from '@midwayjs/orm';
import { BootStrategy, WebPassportStrategyAdapter } from '@deskbtm/midway-passport';
import { Strategy } from 'passport-local';
import { Repository } from 'typeorm';

@BootStrategy({
  async useParams(config) {
    return {
      passwordField: 'pwd',
    };
  },
})
export class LocalStrategy extends WebPassportStrategyAdapter(Strategy, 'local') {
  @InjectEntityModel(UserEntity)
  photoModel: Repository<UserEntity>;

  @Logger('dash')
  logger: ILogger;

  async verify(username, password) {
    // const user = await this.photoModel.findOne({ username });

    this.logger.info('user from db');

    // if (!user) {
    //   throw new Error('not found user ' + username);
    // }

    return {
      username,
      password,
    };
  }
}
