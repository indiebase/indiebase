import { AvailableAuthProviders } from '@indiebase/sdk';
import { AuthProvider } from '@indiebase/trait';

export const createIndiebaseProviders: Partial<AuthProvider>[] = Object.values(
  AvailableAuthProviders,
).map((name) => ({
  name,
  callbackPath: `oauth/indiebase/${name}/callback`,
}));
