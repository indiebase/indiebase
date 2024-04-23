import { AvailableAuthzProviders } from '@indiebase/sdk';
import { OAuthProvider } from '@indiebase/trait';

export const indiebaseDevProviders: OAuthProvider[] = [
  {
    name: AvailableAuthzProviders.google,
    enabled: false,
    clientID: '',
    clientSecret: '',
  },
];
