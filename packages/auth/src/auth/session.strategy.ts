import { Strategy } from 'passport-cookie';
import { PassportStrategy, IPassportStrategy } from '@letscollab/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class SessionStrategy
  extends PassportStrategy(Strategy, 'session')
  implements IPassportStrategy
{
  constructor(private readonly authService: AuthService) {
    super();
  }

  setOptions() {
    return {
      cookieName: 'SID',
    };
  }

  async validate(...data): Promise<any> {
    console.log(data);
  }
}
