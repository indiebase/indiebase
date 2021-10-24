import { PassportControl } from '@deskbtm/midway-passport';

export class LocalPassportControl extends PassportControl {
  name = 'local';

  public onError(err): void {
    console.log(err);
  }

  public auth(_err, data) {
    console.log('local inspect data', data);
    return data;
  }
}
