import { UserEntity } from '@/rbac/user';
import { BootStrategy } from '@deskbtm/midway-passport';
// import { ExpressPassportStrategyAdapter } from '@deskbtm/midway-passport/src/express';
import { Logger } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';
import { InjectEntityModel } from '@midwayjs/orm';
import { ExpressPassportStrategyAdapter } from 'packages/midway-passport/src/express';
import { Strategy } from 'passport-local';
import { Repository } from 'typeorm';

@BootStrategy({
  async useParams() {
    return {
      passwordField: 'pwd',
    };
  },
})
export class LocalStrategy extends ExpressPassportStrategyAdapter(Strategy, 'local') {
  @InjectEntityModel(UserEntity)
  photoModel: Repository<UserEntity>;

  @Logger('dash')
  logger: ILogger;

  async verify(username, password) {
    const user = await this.photoModel.findOne({ username });

    this.logger.info('user from db', user);

    // if (!user) {
    //   throw new Error('not found user ' + username);
    // }

    return {
      username,
      password,
    };
  }
}
