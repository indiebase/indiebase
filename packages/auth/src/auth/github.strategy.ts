import { Strategy } from 'passport-github2';
import { IPassportStrategy, PassportStrategy } from '@letscollab/passport';
import { Injectable } from '@nestjs/common';
import { NacosConfigService } from '@letscollab/nest-nacos';

@Injectable()
export class GithubStrategy
  extends PassportStrategy(Strategy)
  implements IPassportStrategy
{
  constructor(private readonly nacosConfigService: NacosConfigService) {
    super();
  }

  async setOptions() {
    const {
      github: { clientID, clientSecret, callbackURL },
    } = await this.nacosConfigService.getConfig('service-auth.json');
    return { clientID, clientSecret, callbackURL };
  }

  async validate(accessToken, refreshToken, profile) {
    return {
      accessToken,
      refreshToken,
      profile,
    };
  }
}
