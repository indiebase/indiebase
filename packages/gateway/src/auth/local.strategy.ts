import { Strategy } from 'passport-local';
import {
  PassportStrategy,
  StaticPassportStrategy,
} from '@letscollab-nest/fastify-passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy
  extends PassportStrategy(Strategy, 'local')
  implements StaticPassportStrategy
{
  constructor() {
    super();
  }

  async useStaticOptions() {
    return {};
  }

  async validate(username: string, password: string): Promise<any> {
    // const user = await this.authService.validateLocal({ username, password });

    // delete user.password;

    return {};
  }
}
