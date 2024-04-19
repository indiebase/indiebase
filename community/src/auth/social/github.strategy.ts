import { PassportStrategyFactory } from '@indiebase/nest-fastify-passport';
import { PassportStrategy } from '@indiebase/nest-fastify-passport';
import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy
  extends PassportStrategy(Strategy)
  implements PassportStrategyFactory
{
  constructor(private readonly logger: Logger) {
    super();
  }

  async useStrategyOptions() {
    return {
      clientID: '0a9aef8e6f3858f08ce5',
      clientSecret: 'd61cfb4c48c93b80644320f013f6cf91debd8cdf',
      callbackURL:
        'http://api-dev.indiebase.deskbtm.com:8331/v1/auth/github/callback',
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
