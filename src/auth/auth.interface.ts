export interface JwtPayload {
  roles?: string[];

  account: string;
  /**
   * jac token
   */
  a_t: string;

  r_t: string;
}
