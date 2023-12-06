import '@mantine/nprogress/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import '@fontsource/inter';
import './index.css';

import { FC, useState } from 'react';
import { Compose, ComposeProps } from 'reactgets';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DevTools as JotaiDevTools } from 'jotai-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { NavigationProgress } from '@mantine/nprogress';
import { Notifications } from '@mantine/notifications';
import { theme } from './theme';
import uuid from 'uuid';

const DevTools: FC = function () {
  return kDevMode ? (
    <>
      <JotaiDevTools />
      <ReactQueryDevtools initialIsOpen={kDevMode} position="bottom" />
    </>
  ) : null;
};

function App() {
  const [queryClient] = useState(() => new QueryClient());

  const providers: ComposeProps['providers'] = [
    <MantineProvider
      key={uuid.v4()}
      theme={theme}
      defaultColorScheme="light"
    />,
    <QueryClientProvider key={uuid.v4()} client={queryClient} />,
  ];

  return (
    <Compose providers={providers}>
      <DevTools />
      <NavigationProgress />
      <Notifications />
      <RouterProvider
        // fallbackElement={<WorkspaceFallback key="RouterFallback" />}
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </Compose>
  );
}

export default App;
