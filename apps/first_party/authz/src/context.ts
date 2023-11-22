import { Authorizer } from 'casbin.js';
import React from 'react';

export type Possession = Record<string, unknown> | string;

interface AuthzContextProps {
  authorizer: Authorizer;
  setPossess?: (possess: Possession) => void;
}

export const AuthzContext = React.createContext<AuthzContextProps>(null);
