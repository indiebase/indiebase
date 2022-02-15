import { makeAutoObservable } from 'mobx';

export interface JaccountProfile {
  name: string;
  [k: string]: any;
}

export interface User {
  id: number;
  account: string;
  name: string;
  role: string[];
  t: string;
  j_ac: string;
  jaccount: JaccountProfile;
  [k: string]: any;
}
export class GlobalProvider {
  constructor() {
    makeAutoObservable(this);
  }

  user: User = {} as User;

  setUser(user: any) {
    this.user = user;
  }

  isLogin: boolean;

  setLogin(d: boolean) {
    this.isLogin = d;
  }
}
