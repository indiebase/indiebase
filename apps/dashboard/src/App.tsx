import { useState } from 'react';
import { Compose, ComposeProps } from 'reactgets';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DevTools as JotaiDevTools } from 'jotai-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { kDevMode } from '@deskbtm/gadgets/env';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  console.log(import.meta);

  const providers: ComposeProps['providers'] = [
    [MantineProvider],
    [QueryClientProvider, { client: queryClient }],
  ];

  console.log(kDevMode);
  // console.log(demo);

  return (
    <Compose providers={providers}>
      <JotaiDevTools />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </Compose>
  );
}

export default App;
