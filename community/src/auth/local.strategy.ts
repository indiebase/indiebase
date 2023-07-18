import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';
import {
  PassportStrategy,
  PassportStrategyFactory,
} from '@indiebase/nest-fastify-passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy
  extends PassportStrategy(Strategy, 'local')
  implements PassportStrategyFactory
{
  constructor(private readonly authService: AuthService) {
    super();
  }

  async useStrategyOptions() {
    return {};
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateLocal(username, password);

    // delete user.password;

    return user;
  }
}
