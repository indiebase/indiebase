import {
  MediaQuery,
  Header as MantineHeader,
  Burger,
  useMantineTheme,
  Group,
  Anchor,
} from '@mantine/core';
import Link from 'next/link';
import { FC } from 'react';

export interface NavHeaderProps {
  onNavbarOpen?: () => void;
  navbarOpened?: boolean;
}

export const Header: FC<NavHeaderProps> = function (props) {
  const theme = useMantineTheme();
  return (
    <MantineHeader
      fixed
      sx={{
        borderBottom: 'unset',
        backdropFilter: 'saturate(180%) blur(10px)',
        backgroundColor: 'hsla(0,0%,100%,.7)',
      }}
      height={60}
      p="md"
    >
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <Burger
          opened={props.navbarOpened}
          onClick={props.onNavbarOpen}
          size="sm"
          color={theme.colors.gray[6]}
          mr="xl"
        />
      </MediaQuery>
      <Group position="right">
        <Anchor component={Link} href="/docs">
          文档
        </Anchor>

        <Anchor component={Link} href="/pricing">
          价格
        </Anchor>

        <Anchor component={Link} href="#">
          Nawb
        </Anchor>
      </Group>
    </MantineHeader>
  );
};
