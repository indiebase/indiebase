import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './Router';
import './App.less';
import { Suspense } from 'react';
import { Provider } from 'jotai';

const queryClient = new QueryClient();

const isProduction = process.env.NODE_ENV === 'production';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools
        initialIsOpen={!isProduction}
        position="bottom-right"
      />
      <BrowserRouter>
        <Provider>
          <Suspense>
            <AppRouter />
          </Suspense>
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
