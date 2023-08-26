'use client';

import {
  AppShell,
  Burger,
  Button,
  Group,
  MantineProvider,
  Skeleton,
} from '@mantine/core';
import { Inter } from 'next/font/google';
import { useDisclosure } from '@mantine/hooks';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';
import { kDevMode } from '@deskbtm/gadgets/env';
import { Compose, ComposeProps } from 'reactgets';
import { DevTools as JotaiDevTools } from 'jotai-devtools';
import '@mantine/core/styles.css';
import '@/app/i18n/client';
import { supportedLngs } from '@/app/i18n/settings';
import { useTranslation } from '@/app/i18n/use-translation';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps extends PropsWithChildren {
  params: { locale: string };
}

export async function generateStaticParams() {
  return supportedLngs.map((locale) => ({ locale }));
}

export default function RootLayout(props: RootLayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const [queryClient] = useState(() => new QueryClient());
  const { children, params } = props;

  const providers: ComposeProps['providers'] = [
    [MantineProvider],
    [QueryClientProvider, { client: queryClient }],
  ];
  console.log(params.locale);

  const { i18n, t } = useTranslation(params.locale, 'translation');

  return (
    <html lang={params.locale ?? 'en'}>
      <body className={inter.className}>
        <Compose providers={providers}>
          <JotaiDevTools />
          <ReactQueryDevtools
            initialIsOpen={kDevMode}
            position="bottom-right"
          />
          <AppShell
            header={{ height: 60 }}
            footer={{ height: 60 }}
            navbar={{
              width: 300,
              breakpoint: 'sm',
              collapsed: { mobile: !opened },
            }}
            aside={{
              width: 300,
              breakpoint: 'md',
              collapsed: { desktop: false, mobile: true },
            }}
            padding="md"
          >
            <AppShell.Header>
              <Group h="100%" px="md">
                <Burger
                  opened={opened}
                  onClick={toggle}
                  hiddenFrom="sm"
                  size="sm"
                />
                <Button
                  onClick={async () => {
                    console.log(i18n.language, '----');
                    await i18n.changeLanguage(
                      i18n.language === 'en' ? 'zh' : 'en',
                    );
                  }}
                >
                  {t('name')}
                </Button>
                {/* <MantineLogo size={30} /> */}
              </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
              Navbar
              {Array(15)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} h={28} mt="sm" animate={false} />
                ))}
            </AppShell.Navbar>
            <AppShell.Main>
              Aside is hidden on on md breakpoint and cannot be opened when it
              is collapsed
            </AppShell.Main>
            <AppShell.Aside p="md">Aside</AppShell.Aside>
          </AppShell>
        </Compose>
      </body>
    </html>
  );
}
