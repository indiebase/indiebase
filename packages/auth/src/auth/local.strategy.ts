// import { RedisService } from 'nestjs-redis';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private readonly authSrv: AuthService, // private readonly redisSrv: RedisService,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    // await this.redisSrv.getClient().del(username);
    const user = await this.authSrv.validateUser(username, password);

    console.log(username, password);

    return 'demo';
  }
}
