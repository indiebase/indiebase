import { AvailableOAuthProviders } from '@indiebase/sdk';

export enum AvailableAuthProviders {
  email = 'email',
}

export interface OAuthProvider {
  /**
   * Provider name, e.g. google, microsoft
   */
  name: AvailableOAuthProviders;
  /**
   * Enable the login method
   */
  enabled?: boolean;
  /**
   * Client ID for OAuth
   */
  clientId?: string;
  /**
   * Client secret for OAuth
   */
  clientSecret?: string;

  /**
   * Authorized Client IDs e.g. Apple (iOS, macOS, watchOS, tvOS bundle IDs or service IDs), Google (for Android, One Tap, and Chrome extensions)
   */
  authorizedClientIds?: string[];
  /**
   * e.g. WorkOS WorkOS URL, gitlab Self Hosted GitLab URL
   */
  extraPayload?: Record<string, any>;
}
