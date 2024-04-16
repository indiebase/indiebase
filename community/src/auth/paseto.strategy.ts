import { PassportStrategyFactory } from '@indiebase/nest-fastify-passport';
import { PassportStrategy } from '@indiebase/nest-fastify-passport';
import { InjectKnexEx } from '@indiebase/nest-knex';
import { KnexEx } from '@indiebase/server-shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  fromAuthBearer,
  PublicPasetoStrategy,
  type PublicPasetoStrategyOptions,
} from 'passport-paseto';

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
