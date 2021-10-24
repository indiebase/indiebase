import { PassportControl } from '@deskbtm/midway-passport';

export class JwtPassportControl extends PassportControl {
  name = 'jwt';

  public onError(...args: any[]): void {
    throw new Error('Method not implemented.');
  }

  public async auth(_err, data) {
    console.log('jwt inspect data', data);
    return data;
  }
}
