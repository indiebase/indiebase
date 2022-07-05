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
import { LoginModal } from 'components/Modal';
import Link from 'next/link';
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
      <LoginModal
        opened={modalMeta.opened}
        onClose={() => setModalMeta({ opened: false })}
        initialNo={modalMeta.initialNo}
      />
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
          <Link href="/">
            <Image
            
              src="/logo.svg"
              fit="contain"
              width="150px"
              alt="letscollab"
            />
          </Link>
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

          <Group sx={{ marginLeft: 40, span: { fontSize: 14 } }} spacing={6}>
            <Anchor
              component={'span'}
              onClick={(e) => {
                setModalMeta({ opened: true, initialNo: 0 });
              }}
            >
              登录
            </Anchor>
            /
            <Anchor
              component="span"
              onClick={(e) => {
                setModalMeta({ opened: true, initialNo: 1 });
              }}
            >
              注册
            </Anchor>
          </Group>
        </Group>
      </Group>
    </MantineHeader>
  );
};
