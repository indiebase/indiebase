import { AuthService } from './auth.service';
import {
  PassportStrategy,
  PassportStrategyFactory,
} from '@indiebase/nest-fastify-passport';
import { Injectable } from '@nestjs/common';
import {
  PublicPasetoStrategy,
  fromAuthBearer,
  type PublicPasetoStrategyOptions,
} from 'passport-paseto';

@Injectable()
export class PasetoStrategy
  extends PassportStrategy(PublicPasetoStrategy, 'paseto')
  implements PassportStrategyFactory
{
  constructor(private readonly authService: AuthService) {
    super();
  }

  useStrategyOptions(): PublicPasetoStrategyOptions {
    return { getToken: fromAuthBearer() };
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateLocal(username, password);

    // delete user.password;

    return user;
  }
}
