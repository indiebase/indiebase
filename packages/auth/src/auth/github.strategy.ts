import { Strategy } from 'passport-github2';
import { IPassportStrategy, PassportStrategy } from '@letscollab/passport';
import { Injectable, Logger } from '@nestjs/common';
import { NacosConfigService } from '@letscollab/nest-nacos';

@Injectable()
export class GithubStrategy
  extends PassportStrategy(Strategy)
  implements IPassportStrategy
{
  constructor(
    private readonly nacosConfigService: NacosConfigService,
    private readonly logger: Logger,
  ) {
    super();
  }

  async getStrategyOptions() {
    const {
      github: { clientID, clientSecret, callbackURL },
    } = await this.nacosConfigService.getConfig('service-auth.json');
    return { clientID, clientSecret, callbackURL };
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
