import { Strategy } from 'passport-github2';
import {
  ObservablePassportStrategy,
  PassportStrategy,
} from '@letscollab-nest/fastify-passport';
import { Injectable, Logger } from '@nestjs/common';
import { NacosConfigService } from '@letscollab-nest/nacos';

// Observable
@Injectable()
export class GithubStrategy
  extends PassportStrategy(Strategy)
  implements ObservablePassportStrategy
{
  constructor(
    private readonly nacosConfig: NacosConfigService,
    private readonly logger: Logger,
  ) {
    super();
  }

  useConfigManager() {
    return this.nacosConfig;
  }

  async useProperties() {
    return [
      {
        dataId: 'service-auth.json',
        group: 'DEFAULT_GROUP',
        getProperty(options: Record<string, any>) {
          const {
            github: { clientID, clientSecret, callbackURL },
          } = options;
          return { clientID, clientSecret, callbackURL };
        },
      },
    ];
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
