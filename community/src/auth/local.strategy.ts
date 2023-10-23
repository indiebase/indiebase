import { AuthService } from './auth.service';
import { type IStrategyOptions, Strategy } from 'passport-local';
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

  useStrategyOptions(): IStrategyOptions {
    return {
      usernameField: 'email',
      passwordField: 'password',
    };
  }

  async validate(username: string, password: string, ...rest): Promise<any> {
    // console.log(rest);
    // const user = await this.authService.validateLocal(username, password);

    // delete user.password;

    const user = {
      email: 'hanhan',
    };

    return user;
  }
}
