import {
  Text,
  Group,
  UnstyledButton,
  MantineThemeColors,
  AppShell,
  Burger,
  Skeleton,
  Combobox,
} from '@mantine/core';
import { useAtom } from 'jotai';
import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { navbarCollapseAtom } from './navbar.atom';
// import { navbarSwitchAtom } from '../../atoms';

export interface SidebarTileNode {
  label: string;
  to?: string;
  replace?: boolean;
  type?: 'node' | 'link';
  icon?: React.ReactNode;
  color?: keyof MantineThemeColors;
  children?: SidebarTileNode[];
  access?: string[];
  onClick?: () => Promise<void> | void;
}
export interface SidebarProps {
  // menu: SidebarTileNode[];
  semver?: string;
}

interface MenuItemProps {
  label: string;
  active: boolean;
  onClick?: (e: any) => void;
}

function SidebarTile({ label, active, onClick }: MenuItemProps) {
  return (
    <UnstyledButton
      onClick={onClick}
      // sx={(theme) => ({
      //   display: 'block',
      //   width: '100%',
      //   padding: theme.spacing.xs,
      //   paddingLeft: 20,
      //   borderRadius: theme.radius.sm,
      //   color: active ? theme.colors.blue[6] : theme.colors.gray[7],
      //   fontSize: 13,
      //   backgroundColor: active ? theme.colors.gray[0] : 'none',
      //   fontWeight: active ? 'bolder' : 'unset',
      //   '&:hover': {
      //     backgroundColor:
      //       theme.colorScheme === 'dark'
      //         ? theme.colors.dark[6]
      //         : theme.colors.gray[0],
      //   },
      // })}
    >
      <Group>
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const useAccordionControl = function (menu: SidebarTileNode[]) {
  const [value, setValue] = useState<string[] | null>([]);
  const location = useLocation();

  // useEffect(() => {
  //   for (const item of menu) {
  //     if (Array.isArray(item.children)) {
  //       const r = item.children.find((e) => location.pathname.includes(e.to));
  //       if (r) {
  //         setValue([...value, item.label]);
  //         break;
  //       }
  //     }
  //   }
  // }, [menu]);

  return [value, setValue];
};

export const AppShellDrawer: FC<SidebarProps> = function (props) {
  // const navigate = useNavigate();
  // const opened = useAtomValue(navbarSwitchAtom);
  // const [value, setValue] = useAccordionControl(props.menu);
  // const theme = useMantineTheme();
  // const matches = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [opened, toggle] = useAtom(navbarCollapseAtom);

  return (
    <AppShell.Navbar p="md">
      <Burger
        opened={opened.mobile}
        onClick={() => toggle({ ...opened, desktop: !opened.mobile })}
        hiddenFrom="sm"
        size="xs"
      />
      <Combobox radius="lg" />
      {Array(15)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} h={28} mt="sm" animate={false} />
        ))}
    </AppShell.Navbar>
  );
};
