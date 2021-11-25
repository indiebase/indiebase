import { BootStrategy, WebPassportStrategyAdapter } from '@deskbtm/midway-passport';
import { Strategy, StrategyOptions } from 'passport-qq';

@BootStrategy({
  async useParams({ configuration }): Promise<StrategyOptions> {
    return {
      clientID: '101980624',
      clientSecret: '1f2428a87b3184739dc9a0af77b7c1ca',
      callbackURL: 'https://127.0.0.1:6666/auth1/qq-cb',
    };
  },
})
export class QQStrategy extends WebPassportStrategyAdapter(Strategy, 'qq') {
  async verify(...payload) {
    return payload;
  }
}
