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
import { FC, useState } from 'react';

export interface NavHeaderProps {
  onNavbarOpen?: () => void;
  navbarOpened?: boolean;
}

export const Header: FC<NavHeaderProps> = function (props) {
  const theme = useMantineTheme();
  const matches = useMediaQuery('(max-width: 768px)');
  const [modalMeta, setModalMeta] = useState<{
    initialNo?: number;
    opened: boolean;
  }>({
    opened: false,
  });

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
          <Anchor href="/">
            <Image
              src="/logo.svg"
              fit="contain"
              width="150px"
              alt="letscollab"
            />
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
                <Anchor href="/docs">文档</Anchor>

                <Anchor href="/pricing">价格</Anchor>

                <Anchor href="#">Nawb</Anchor>
              </Group>
            </Group>
          </MediaQuery>
        </Group>
      </Group>
    </MantineHeader>
  );
};
