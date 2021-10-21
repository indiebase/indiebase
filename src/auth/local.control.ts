import { PassportControl } from 'packages/midway-passport';

export class LocalPassportControl extends PassportControl {
  name = 'local';

  public onError(err): void {
    console.log(err);
  }

  public auth(_err, data): void {
    console.log('local inspect data', data);
  }
}
