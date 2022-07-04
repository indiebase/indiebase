import { FC } from 'react';
import { useRoutes } from 'react-router-dom';

export const RootRoutes: FC<any> = function () {
  return useRoutes([
    {
      path: '/',
      element: <div></div>,
    },
  ]);
};
