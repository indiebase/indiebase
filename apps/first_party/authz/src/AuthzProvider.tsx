import { Authorizer } from 'casbin.js';
import { type FC, type PropsWithChildren, useMemo, useState } from 'react';

import { AuthzContext, type Possession } from './context';

export interface AuthzProviderProps extends PropsWithChildren {
  possess?: Possession;
  mode?: ConstructorParameters<typeof Authorizer>[0];
  request?: ConstructorParameters<typeof Authorizer>[1];
  user?: string;
}

export const AuthzProvider: FC<AuthzProviderProps> = function (props) {
  const [possess, setPossess] = useState<Possession>(props.possess);

  const { children, mode, request, user } = props;

  const authorizer = useMemo(() => {
    let auth;
    switch (mode) {
      case 'auto':
        auth = new Authorizer(mode, request);
        auth.setUser(user);
        break;
      default:
        auth = new Authorizer(mode);
        auth.setPermission(possess);
    }

    return auth;
  }, [possess, mode]);

  return (
    <AuthzContext.Provider value={{ authorizer, setPossess }}>
      {children}
    </AuthzContext.Provider>
  );
};

AuthzProvider.defaultProps = {
  mode: 'manual',
};
