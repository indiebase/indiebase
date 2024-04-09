import { AppShell, Burger } from '@mantine/core';
import { useAtom } from 'jotai';
import { navbarCollapseAtom } from './navbar.atom';
import { type FC } from 'react';
import { SelectMenu } from '~/components/SelectMenu';
import { NavMenu } from './NavMenu';

export interface AppShellDrawerProps {
  // menu: NavbarMenuTile[];
  semver?: string;
}

const OrgSelect = function () {
  return (
    <SelectMenu
      onOptionSubmit={(val) => {
        console.log(val);
      }}
      searchPlaceholder="Search organization"
      placeholder="Pick organization"
      items={[
        {
          icon: 'https://randomuser.me/api/portraits/med/women/88.jpg',
          value: 'indiebase',
          label: 'indiebase',
        },
      ]}
    />
  );
};

export const AppShellDrawer: FC<AppShellDrawerProps> = function (props) {
  const [opened, toggle] = useAtom(navbarCollapseAtom);

  return (
    <AppShell.Navbar p="md">
      <Burger
        opened={opened.mobile}
        onClick={() => toggle({ ...opened, mobile: !opened.mobile })}
        hiddenFrom="sm"
        size="xs"
      />
      <OrgSelect />
      {/* <SkeletonList /> */}
      <NavMenu mt={20} />
    </AppShell.Navbar>
  );
};
