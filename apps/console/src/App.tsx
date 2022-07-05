import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './Router';

const queryClient = new QueryClient();

const isProduction = process.env.NODE_ENV === 'production';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {!isProduction && <ReactQueryDevtools position="bottom-right" />}
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
