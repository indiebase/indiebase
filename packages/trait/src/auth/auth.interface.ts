export enum AvailableAuthzProviders {
  google = 'google',
  microsoft = 'microsoft',
  github = 'github',
  twitter = 'twitter',
  facebook = 'facebook',
  qq = 'qq',
  wechat = 'wechat',
  apple = 'apple',
}

export type OAuthProvider = {
  /**
   * Provider name, e.g. google, microsoft
   */
  name: AvailableAuthzProviders;
  /**
   * Enable the login method
   */
  enabled?: boolean;
  /**
   * Client ID for OAuth
   */
  clientID: string;
  /**
   * Client secret for OAuth
   */
  clientSecret: string;
  /**
   * Authorized Client IDs e.g. Apple (iOS, macOS, watchOS, tvOS bundle IDs or service IDs), Google (for Android, One Tap, and Chrome extensions)
   */
  authorizedClientIDs?: string[];
  /**
   * e.g. WorkOS WorkOS URL, gitlab Self Hosted GitLab URL
   */
  extraPayload?: Record<string, any>;
};
