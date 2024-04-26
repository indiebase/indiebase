export enum AvailableAuthProviders {
  email = 'email',
  google = 'google',
  microsoft = 'microsoft',
  github = 'github',
  twitter = 'twitter',
  facebook = 'facebook',
  qq = 'qq',
  wechat = 'wechat',
  apple = 'apple',
}

export type AuthProvider = {
  /**
   * Provider name, e.g. google, microsoft
   */
  name: AvailableAuthProviders;
  /**
   * Enable the login method
   */
  enabled?: boolean;
  /**
   * Client ID for OAuth
   */
  clientID?: string;
  /**
   * Client secret for OAuth
   */
  clientSecret?: string;

  /**
   * Callback url path
   * @example
   * ```
   * /auth/oauth/{projectId}/github/callback
   *
   * https://api-dev.indiebase.deskbtm.com/auth/oauth/{projectId}/github/callback
   * ```
   */
  callbackPath: string;
  /**
   * Authorized Client IDs e.g. Apple (iOS, macOS, watchOS, tvOS bundle IDs or service IDs), Google (for Android, One Tap, and Chrome extensions)
   */
  authorizedClientIDs?: string[];
  /**
   * e.g. WorkOS WorkOS URL, gitlab Self Hosted GitLab URL
   */
  extraPayload?: Record<string, any>;
};
