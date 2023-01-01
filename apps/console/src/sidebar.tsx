import { Sidebar } from '@letscollab-community/console-utils';
import { FC } from 'react';
import { useMenu } from './use-menu';

export const CommunitySidebar: FC = function () {
  const menu = useMenu();

  return <Sidebar menu={menu}></Sidebar>;
};
