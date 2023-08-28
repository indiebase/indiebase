import { FC, ReactElement, Suspense } from 'react';
import {
  AppShell,
  Box,
  Burger,
  Group,
  Skeleton,
  useMantineTheme,
  Image,
  rem,
  em,
} from '@mantine/core';
import { Header, NavHeaderProps } from './Header';
// import { ErrorBoundary } from 'react-error-boundary';
import { Footer } from './Footer';
import { useDisclosure } from '@mantine/hooks';
import { IconMenu2 } from '@tabler/icons-react';
import { InidebaseTextLogo } from '@/components/Icons';

export interface DashboardLayoutProps {}

const DashboardLayout: FC<DashboardLayoutProps> = () => {
  const theme = useMantineTheme();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  console.log(
    '%c------------------------DashboardLayout re-render------------------------------',
    'color:green',
  );

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding={{ base: 'md', lg: 0 }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="xs"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="xs"
          />
          <InidebaseTextLogo size={160} />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Burger
          opened={mobileOpened}
          onClick={toggleMobile}
          hiddenFrom="sm"
          size="xs"
        />
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <AppShell.Navbar
          p="md"
          w={rem(200)}
          style={{
            left: 'unset',
            top: `calc(${rem(60)})`,
          }}
        >
          {Array(15)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={false} />
            ))}
        </AppShell.Navbar>

        {/* <nav
          with-border
          style={{
            width: em(200),
            height: '100vh',
            borderRight: 'var()',
          }}
        ></nav> */}
      </AppShell.Main>
    </AppShell>
  );
};

export const Component = function () {
  return (
    <>
      <DashboardLayout />
    </>
  );
};
