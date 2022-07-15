import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './Router';
import { Provider } from 'jotai';
import './App.less';
import { queryClientAtom } from 'jotai/query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});

const isProduction = process.env.NODE_ENV === 'production';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools
        initialIsOpen={!isProduction}
        position="bottom-right"
      />
      <BrowserRouter>
        <Provider initialValues={[[queryClientAtom, queryClient] as any]}>
          <AppRouter />
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
