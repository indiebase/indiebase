import { KnexEx } from '@indiebase/server-shared';
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
import { InjectKnexEx } from '@indiebase/nest-knex';

@Injectable()
export class PasetoStrategy
  extends PassportStrategy(PublicPasetoStrategy, 'paseto')
  implements PassportStrategyFactory
{
  constructor(
    private readonly config: ConfigService,
    @InjectKnexEx()
    private readonly knexEx: KnexEx,
  ) {
    super();
  }

  useStrategyOptions(): PublicPasetoStrategyOptions {
    const publicKey = this.config.get('auth.pasetoPublicKey');

    return { getToken: fromAuthBearer(), publicKey, version: 'V4' };
  }

  async validate(payload): Promise<any> {
    const user = await this.knexEx.getUserByEmail(
      payload.email,
      payload.namespace,
    );

    return user;
  }
}
