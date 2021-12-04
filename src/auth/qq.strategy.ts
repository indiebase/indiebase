import { BootStrategy, ExpressPassportStrategyAdapter } from '@deskbtm/midway-passport';
import { Strategy, StrategyOptions } from 'passport-qq';

@BootStrategy({
  async useParams({ configuration }): Promise<StrategyOptions> {
    return {
      clientID: '101977103',
      clientSecret: 'd38770bc179694166df618aaf3f9c638',
      callbackURL: 'https://127.0.0.1:8001/auth2/qq-cb',
    };
  },
})
export class QQStrategy extends ExpressPassportStrategyAdapter(Strategy, 'qq') {
  async verify(...payload) {
    console.log(payload);
    return payload;
  }
}
