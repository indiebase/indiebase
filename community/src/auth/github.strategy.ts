import { Strategy } from 'passport-github2';
import {
  PassportStrategyFactory,
  PassportStrategy,
} from '@indiebase/nest-fastify-passport';
import { Injectable, Logger } from '@nestjs/common';

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
      clientID: '1111',
      clientSecret: '1111',
      callbackURL: 'http://collab.deskbtm.com:23331/v1/auth/github/callback',
    };
    // const subscriptions = [
    //   {
    //     dataId: 'mutable.json',
    //     group: 'DEFAULT_GROUP',
    //     getProperty(options: Record<string, any>) {
    //       const {
    //         github: { clientID, clientSecret, callbackURL },
    //       } = options;
    //       return { clientID, clientSecret, callbackURL };
    //     },
    //   },
    // ];
    // for await (const sub of subscriptions) {
    //   const { getProperty, ...rest } = sub;
    //   await this.nacosConfig.subscribe(rest, (config) => {
    //     const options = getProperty(config);
    //     use(appStrategy(options));
    //   });
    // }
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
