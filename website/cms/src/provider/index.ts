import React from 'react';
import { GlobalProvider } from './GlobalProvider';

export const globalProvider = new GlobalProvider();
export const GlobalContext = React.createContext(globalProvider);
