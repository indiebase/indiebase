import { Typography } from '@mui/material';
import { FC } from 'react';
import { ReactElement } from 'react';
import { Group } from './Group';

export type MenuType = 'group' | 'item';

export interface MenuItemProps {
  id: string;
  title?: string;
  type?: MenuType;
  uri?: string;
  path?: string;
  icon?: ReactElement | any;
  showTitleBar?: boolean;
  children?: MenuItemProps[];
  /**
   * if open a new window
   */
  target?: boolean;
}

export interface MenuProps {
  items?: MenuItemProps[];
  [key: string]: any;
}

export const Menu: FC<MenuProps> = (props) => {
  const { items } = props;
  const navItems = items.map((item) => {
    switch (item.type) {
      case 'group':
        return <Group key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};
