import { AuthService } from './auth.service';
import {
  type IStrategyOptions,
  Strategy,
  IStrategyOptionsWithRequest,
} from 'passport-local';
import {
  PassportStrategy,
  PassportStrategyFactory,
} from '@indiebase/nest-fastify-passport';
import { Injectable } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

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
