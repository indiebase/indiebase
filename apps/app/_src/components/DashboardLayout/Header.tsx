import {
  Burger,
  Group,
  AppShell,
  Divider,
  Menu,
  Avatar,
  rem,
} from '@mantine/core';
import { type FC } from 'react';
import { useAtom } from 'jotai';
import { navbarCollapseAtom } from './navbar.atom';
import {
  IconUser,
  IconSettings,
  IconFileDescription,
  IconLogout,
  IconPlus,
} from '@tabler/icons-react';

const PreferencesMenu = function () {
  return (
    <Menu width={200} position="bottom-end" withArrow>
      <Menu.Target>
        <Avatar mr={10} src={''} radius="xl" size={rem(33)}>
          <IconUser size={20} />
        </Avatar>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          // onClick={() => {
          //   navigate(`/users/${profile.username}/settings/profile`);
          // }}
          leftSection={<IconSettings size={16} />}
        >
          Settings
        </Menu.Item>
        <Menu.Item leftSection={<IconFileDescription size={16} />}>
          Docs
        </Menu.Item>
        <Menu.Item
          leftSection={<IconPlus size={16} />}
          onClick={() => {
            // navigate('/create/org');
          }}
        >
          Create Organization
        </Menu.Item>
        <Divider my="xs" variant="dashed" labelPosition="center" />
        <Menu.Item leftSection={<IconLogout size={16} />}>Sign Out</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export interface AppShellHeaderProps {
  logo: React.ReactNode;
}

export const AppShellHeader: FC<AppShellHeaderProps> = function (props) {
  const [opened, toggle] = useAtom(navbarCollapseAtom);

  return (
    <AppShell.Header
      style={{
        backdropFilter: 'saturate(180%) blur(10px)',
        backgroundColor: 'hsla(0,0%,100%,.6)',
      }}
    >
      <Group h="100%" px="md" wrap="nowrap" grow justify="space-between">
        <Group h="100%">
          <Burger
            opened={opened.mobile}
            onClick={() => toggle({ ...opened, mobile: !opened.mobile })}
            hiddenFrom="sm"
            size="xs"
          />
          <Burger
            opened={opened.desktop}
            onClick={() => toggle({ ...opened, desktop: !opened.desktop })}
            visibleFrom="sm"
            size="xs"
          />
          {props.logo}
        </Group>

        <Group h="100%" justify="flex-end">
          <Divider mr={5} my={15} orientation="vertical" />
          <PreferencesMenu />
        </Group>
      </Group>
    </AppShell.Header>
  );
};
