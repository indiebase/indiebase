import { useLocation } from 'react-router-dom';
import { useReducer } from 'react';

export const useParamsQuery = function () {
  return new URLSearchParams(useLocation().search);
};

export const useForceUpdate = () => {
  const [, dispatch] = useReducer((x) => x + 1, 0);
  return dispatch;
};
