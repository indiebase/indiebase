export type UserSession = {
  username: string;
  id: number;
  role: string;
  access: any;
  loggedIn: boolean;
  [k: string]: any;
};
