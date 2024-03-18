import type {
  PassportStrategyFactory} from '@indiebase/nest-fastify-passport';
import {
  PassportStrategy
} from '@indiebase/nest-fastify-passport';
import { Injectable } from '@nestjs/common';
import type {FastifyRequest } from 'fastify';
import { FastifyReply } from 'fastify';
import type {
  IStrategyOptionsWithRequest} from 'passport-local';
import {
  type IStrategyOptions,
  Strategy,
} from 'passport-local';

import type { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy
  extends PassportStrategy(Strategy, 'local')
  implements PassportStrategyFactory
{
  constructor(private readonly authService: AuthService) {
    super();
  }

  useStrategyOptions(): IStrategyOptions | IStrategyOptionsWithRequest {
    return {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    };
  }

  async validate(
    request: FastifyRequest,
    email: string,
    password: string,
  ): Promise<any> {
    const user = this.authService.validateLocal(
      request.raw.project.namespace,
      email,
      password,
    );

    return user;
  }
}
