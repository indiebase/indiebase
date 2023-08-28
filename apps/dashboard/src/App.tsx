import { FC, useState } from 'react';
import { Compose, ComposeProps } from 'reactgets';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DevTools as JotaiDevTools } from 'jotai-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import '@deskbtm/gadgets/env';
import '@mantine/nprogress/styles.css';
import { NavigationProgress } from '@mantine/nprogress';

const DevTools: FC = function () {
  return kDevMode ? (
    <>
      <JotaiDevTools />
      <ReactQueryDevtools initialIsOpen={kDevMode} position="bottom-right" />
    </>
  ) : null;
};

function App() {
  const [queryClient] = useState(() => new QueryClient());
  console.log(import.meta);

  const providers: ComposeProps['providers'] = [
    [MantineProvider],
    [QueryClientProvider, { client: queryClient }],
  ];

  return (
    <Compose providers={providers}>
      <NavigationProgress />
      <DevTools />
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
