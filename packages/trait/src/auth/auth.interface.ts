/**
 * Signup Type Enum
 */
export enum SignupType {
  indiebase = 'indiebase',
  github = 'github',
}

export type UserSession = {
  username: string;
  // database use id
  id: number;
  role?: string;
  access?: any;
  loggedIn: boolean;
  [k: string]: any;
};

export type ValidAuthData = {
  user: UserSession;
  domain: string;
};
