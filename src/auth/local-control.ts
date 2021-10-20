import { PassportControl } from 'packages/midway-passport';

export class LocalPassportControl extends PassportControl {
  name = 'local';

  public onError(...args: any[]): void {
    console.log(args);
    // throw new Error('Method not implemented.');
  }

  public inspect(...d): void {
    // console.log(d, '==========================');
  }
}
