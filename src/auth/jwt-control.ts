import { PassportControl } from 'packages/midway-passport';

export class JwtPassportControl extends PassportControl {
  name = 'jwt';

  public onError(...args: any[]): void {
    throw new Error('Method not implemented.');
  }

  public inspect(d): void {
    console.log(d, '@@@@@@');
    // throw new Error(d as any);
  }
}
