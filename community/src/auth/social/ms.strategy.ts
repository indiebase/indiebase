import { Strategy } from 'passport-github2';
import {
  PassportStrategyFactory,
  PassportStrategy,
} from '@indiebase/nest-fastify-passport';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MicrosoftStrategy
  extends PassportStrategy(Strategy)
  implements PassportStrategyFactory
{
  constructor(private readonly logger: Logger) {
    super();
  }

  async useStrategyOptions() {
    return {
      clientID: '1111',
      clientSecret: '1111',
      callbackURL: 'http://indiebase.deskbtm.com:23331/v1/auth/github/callback',
    };
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    this.logger.debug('Github Tokens:', accessToken, refreshToken);

    return {
      accessToken,
      refreshToken,
      profile,
    };
  }
}
