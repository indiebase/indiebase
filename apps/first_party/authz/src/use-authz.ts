import { useContext } from 'react';
import { AuthzContext } from './context';

export const useAuthz = function () {
  return useContext(AuthzContext);
};
