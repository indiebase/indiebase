import { Typography } from '@mui/material';
import { FC } from 'react';
import { ReactElement } from 'react';
import NavGroup from './Group';

export type MenuType = 'group' | 'single';

export interface MenuItemProps {
  id: string;
  title?: string;
  type?: MenuType;
  uri?: string;
  path?: string;
  icon?: ReactElement;
  showTitleBar: boolean;
}

export interface MenuProps {
  items: MenuItemProps[];
  [key: string]: any;
}

export const Menu: FC<MenuProps> = (props) => {
  const { items } = props;
  const navItems = items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
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
