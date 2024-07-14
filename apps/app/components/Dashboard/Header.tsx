'use client';

import { AppShell, Avatar, Burger, Divider, Group, Menu } from '@mantine/core';
import {
  IconFileDescription,
  IconLogout,
  IconPlus,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import { useMolecule } from 'bunshi/react';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { type FC } from 'react';

import classes from './Dashboard.module.css';
import { NavbarMolecule } from './Navbar';

const PreferencesMenu = function () {
  return (
    <Menu width={200} position="bottom-end" withArrow>
      <Menu.Target>
        <Avatar mr={10} src={''} radius="xl" size={33}>
          <IconUser size={20} />
        </Avatar>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          leftSection={<IconSettings size={16} />}
          href="/dash/my/settings"
        >
          Settings
        </Menu.Item>
        <Menu.Item leftSection={<IconFileDescription size={16} />}>
          Docs
        </Menu.Item>
        <Menu.Item
          component={Link}
          leftSection={<IconPlus size={16} />}
          href="/dash/create/org"
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
  const navbarMolecule = useMolecule(NavbarMolecule);
  const [opened, toggle] = useAtom(navbarMolecule.collapsedAtom);

  return (
    <AppShell.Header className={classes.header}>
      <Group h="100%" px="md" wrap="nowrap" justify="space-between">
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
