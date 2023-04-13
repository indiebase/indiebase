import { Strategy } from 'passport-google-oauth20';
import {
  PassportStrategyFactory,
  PassportStrategy,
} from '@letscollab/nest-fastify-passport';
import { Injectable, Logger } from '@nestjs/common';

// Observable
@Injectable()
export class GoogleStrategy
  extends PassportStrategy(Strategy)
  implements PassportStrategyFactory
{
  constructor(private readonly logger: Logger) {
    super();
  }

  async useStrategyOptions() {
    return {
      clientID:
        '177638204819-7mtgpl5erj9ckg6590nq62f8d05j1kim.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://collab.deskbtm.com:23331/v1/auth/google/callback/',
    };
  }

  // async useStrategy(appStrategy, use) {
  //   // const subscriptions = [
  //   //   {
  //   //     dataId: 'mutable.json',
  //   //     group: 'DEFAULT_GROUP',
  //   //     getProperty(options: Record<string, any>) {
  //   //       const {
  //   //         github: { clientID, clientSecret, callbackURL },
  //   //       } = options;
  //   //       return { clientID, clientSecret, callbackURL };
  //   //     },
  //   //   },
  //   // ];
  //   // for await (const sub of subscriptions) {
  //   //   const { getProperty, ...rest } = sub;
  //   //   await this.nacosConfig.subscribe(rest, (config) => {
  //   //     const options = getProperty(config);
  //   //     use(appStrategy(options));
  //   //   });
  //   // }
  // }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    this.logger.debug('Github Tokens:', accessToken, refreshToken);

    return {
      accessToken,
      refreshToken,
      profile,
    };
  }
}
