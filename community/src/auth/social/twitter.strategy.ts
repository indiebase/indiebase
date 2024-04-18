import { PassportStrategyFactory } from '@indiebase/nest-fastify-passport';
import { PassportStrategy } from '@indiebase/nest-fastify-passport';
import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-github2';

// Observable
@Injectable()
export class AppleStrategy
  extends PassportStrategy(Strategy)
  implements PassportStrategyFactory
{
  constructor(private readonly logger: Logger) {
    super();
  }

  async useStrategy(appStrategy, use) {
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
