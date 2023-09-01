import { Burger, Group, AppShell, Divider } from '@mantine/core';
import { FC } from 'react';
import { useAtom } from 'jotai';
import { navbarCollapseAtom } from './navbar.atom';

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
            onClick={() => toggle({ ...opened, desktop: !opened.mobile })}
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
          <Divider mr={10} my={15} orientation="vertical" />
        </Group>
      </Group>
    </AppShell.Header>
  );
};
