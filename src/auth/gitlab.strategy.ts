import { BootStrategy, ExpressPassportStrategyAdapter } from '@deskbtm/midway-passport';
import { Strategy, StrategyOptions } from 'passport-oauth2';

@BootStrategy({
  async useParams({ configuration }): Promise<StrategyOptions> {
    return {
      clientID: 'a545d36e1ce803efbdff0208197a7df7afaf4dbc7f2e6c5cb1b6598b6b416aae',
      clientSecret: '96d12cf3cbedcea1dc1031ae351b2672182d9a89677ccaa355db56357af4d4bc',
      tokenURL: 'https://gitlab.com/oauth/token',
      authorizationURL: 'https://gitlab.com/oauth/authorize',
      callbackURL: 'https://127.0.0.1:8001/auth1/gitlab-cb',
    };
  },
})
export class GitlabStrategy extends ExpressPassportStrategyAdapter(Strategy, 'gitlab') {
  async verify(...payload) {
    return payload;
  }
}
