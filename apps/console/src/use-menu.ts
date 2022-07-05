import { useMemo } from 'react';

export interface MenuNode {
  title: string;
  to?: string;
  icon?: React.ReactNode;
  children?: MenuNode | MenuNode[];
  onClick?: () => Promise<void> | void;
}

export const useMenu = () => {
  return useMemo<MenuNode[]>(
    () => [
      {
        title: 'Home',
        to: 'home',
      },
    ],
    [],
  );
};
