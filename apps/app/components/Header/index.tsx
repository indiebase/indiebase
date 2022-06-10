import {
  MediaQuery,
  Header as MantineHeader,
  Burger,
  useMantineTheme,
  Group,
  Anchor,
  Divider,
  Image,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';
import { FC } from 'react';

export interface NavHeaderProps {
  onNavbarOpen?: () => void;
  navbarOpened?: boolean;
}

export const Header: FC<NavHeaderProps> = function (props) {
  const theme = useMantineTheme();
  const matches = useMediaQuery('(max-width: 768px)');
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
          marginRight: matches ? 0 : 50,
        })}
      >
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Group>
            <Burger
              opened={props.navbarOpened}
              onClick={props.onNavbarOpen}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </Group>
        </MediaQuery>
        <Group sx={{ marginLeft: matches ? 0 : 30 }}>
          <Image
            src="/logo.svg"
            fit="contain"
            width="150px"
            // height={'100%'}
            alt="letscollab"
          />
        </Group>

        <Group
          sx={(theme) => ({
            height: '100%',
          })}
        >
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Group
              sx={(theme) => ({
                height: '100%',
              })}
            >
              <Group sx={{ marginRight: 40 }} spacing={40}>
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
              <Divider orientation="vertical" />
            </Group>
          </MediaQuery>

          <Group sx={{ marginLeft: 40 }} spacing={6}>
            <Anchor component={Link} href="#">
              登录
            </Anchor>
            /
            <Anchor component={Link} href="#">
              注册
            </Anchor>
          </Group>
        </Group>
      </Group>
    </MantineHeader>
  );
};
