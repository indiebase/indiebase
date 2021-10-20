import { BootStrategy } from '@deskbtm/midway-passport';
import { ExpressPassportStrategyAdapter } from '@deskbtm/midway-passport/express';
import { Strategy } from 'passport-local';

@BootStrategy({
  async useParams() {
    return {
      passwordField: 'pwd',
    };
  },
})
export class LocalStrategy extends ExpressPassportStrategyAdapter(Strategy, 'local') {
  async verify(username, password) {
    return {
      username,
      password,
    };
  }
}
