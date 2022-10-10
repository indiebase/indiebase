import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import { queryClientAtom } from 'jotai/query';
import { AppRouter } from './Router';
import { Provider } from 'jotai';
import { useAtomsDebugValue } from 'jotai/devtools';
import './App.less';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});

const DebugAtoms = () => {
  useAtomsDebugValue();
  return null;
};

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
          <DebugAtoms />
          <AppRouter />
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
