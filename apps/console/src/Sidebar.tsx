import { Sidebar } from '@indiebase/console-shared';
import { FC } from 'react';
import { useMenu } from './use-menu';

export const CommunitySidebar: FC = function () {
  const menu = useMenu();

  return <Sidebar menu={menu} semver={process.env.REACT_APP_SEMVER} />;
};
