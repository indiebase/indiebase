import { AvailableOAuthProviders } from '@indiebase/sdk';
import { OAuthProvider } from '@indiebase/trait';

export const indiebaseDevProviders: OAuthProvider[] = [
  {
    name: AvailableOAuthProviders.google,
    enabled: false,
    clientID: '',
    clientSecret: '',
  },
];
