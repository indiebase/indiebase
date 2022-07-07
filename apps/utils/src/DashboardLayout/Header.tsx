import {
  MediaQuery,
  Header as MantineHeader,
  Burger,
  useMantineTheme,
  Group,
  Anchor,
  Image,
} from '@mantine/core';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export interface NavHeaderProps {
  onNavbarOpen?: () => void;
  logo: React.ReactNode;
  nav?: React.ReactNode;
  logoHref: string;
  navbarOpened: boolean;
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
        alignItems: 'center',
      }}
      height={65}
      p="md"
    >
      <Group
        position="apart"
        sx={(theme) => ({
          height: '100%',
          a: {
            textDecoration: 'none',
            color: theme.colors.dark[6],
            fontSize: 14,
          },
        })}
      >
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={props.navbarOpened}
            onClick={props.onNavbarOpen}
            size="sm"
            color={theme.colors.gray[6]}
          />
        </MediaQuery>
        <Group ml={10}>
          <Anchor
            component={Link}
            to={props.logoHref}
            reloadDocument={false}
            underline={false}
          >
            {props.logo}
          </Anchor>
        </Group>

        <Group
          sx={() => ({
            height: '100%',
          })}
        >
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Group
              sx={() => ({
                height: '100%',
              })}
            >
              <Group sx={{ marginRight: 40 }} spacing={40}>
                {props.nav}
              </Group>
            </Group>
          </MediaQuery>
        </Group>
      </Group>
    </MantineHeader>
  );
};
