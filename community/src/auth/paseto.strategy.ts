import { AuthService } from './auth.service';
import {
  PassportStrategy,
  PassportStrategyFactory,
} from '@indiebase/nest-fastify-passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  useStrategyOptions(): PublicPasetoStrategyOptions {
    const publicKey = this.config.get('auth.pasetoPublicKey');

    return { getToken: fromAuthBearer(), publicKey, version: 'V4' };
  }

  async validate(payload): Promise<any> {
    // const user = await this.authService.validateLocal(username, password);
    return payload;
  }
}
