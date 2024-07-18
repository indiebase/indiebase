'use client';

import { Anchor, AppShell, rem } from '@mantine/core';
import { useMolecule } from 'bunshi/react';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { type FC } from 'react';

import { ClientOnly } from '~/components/ClientOnly';
import { AppShellHeader } from '~/components/Dashboard';
import { NavbarMolecule } from '~/components/Dashboard/Navbar';
import { IndiebaseTextLogo } from '~/components/Icons';
import { reRenderPrint } from '~/utils/helper';

export interface AppShellProps extends React.PropsWithChildren {
  navbar: React.ReactNode;
}

const AppShellLayout: FC<AppShellProps> = ({ children }) => {
  const navbarMolecule = useMolecule(NavbarMolecule);
  const [collapsed] = useAtom(navbarMolecule.collapsedAtom);

  reRenderPrint('AppShellLayout');

  return (
    <ClientOnly>
      <AppShell
        layout="alt"
        header={{ height: rem(65) }}
        navbar={{
          width: rem(300),
          breakpoint: 'sm',
          collapsed: {
            mobile: !collapsed.mobile,
            desktop: !collapsed.desktop,
          },
        }}
      >
        <AppShellHeader
          logo={
            <Anchor href="/" component={Link} display="flex">
              <IndiebaseTextLogo size={160} />
            </Anchor>
          }
        />
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </ClientOnly>
  );
};

export default AppShellLayout;
