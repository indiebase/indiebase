import { PassportControl } from 'packages/midway-passport';

export class JwtPassportControl extends PassportControl {
  name = 'jwt';

  public onError(...args: any[]): void {
    throw new Error('Method not implemented.');
  }

  public auth(_err, data): void {
    console.log('jwt inspect data', data);
  }
}
