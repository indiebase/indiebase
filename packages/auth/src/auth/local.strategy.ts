// import { RedisService } from 'nestjs-redis';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AvailableUserInfo } from './auth.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authSrv: AuthService) {
    super();
  }

  async validate(info: AvailableUserInfo): Promise<any> {
    // await this.redisSrv.getClient().del(username);
    const user = await this.authSrv.validateUser(info);

    return 'demo';
  }
}
