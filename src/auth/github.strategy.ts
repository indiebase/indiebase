import { BootStrategy, WebPassportStrategyAdapter } from '@midwayjs/passport';
import { Strategy, StrategyOptions } from 'passport-github2';

@BootStrategy({
  async useParams({ configuration }): Promise<StrategyOptions> {
    return {
      clientID: '45c82c4eaf2d416ebd51',
      clientSecret: 'a67ef313e37677fd3c8f624e6657972743b06232',
      callbackURL: 'https://127.0.0.1:6666/auth/github-cb',
    };
  },
})
export class GithubStrategy extends WebPassportStrategyAdapter(Strategy, 'github') {
  async verify(...payload) {
    return payload;
  }
}
