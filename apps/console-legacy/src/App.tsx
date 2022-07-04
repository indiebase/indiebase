import { BrowserRouter } from 'react-router-dom';
import { RootRoutes } from './RootRoutes';
import { GlobalContext, globalProvider } from './provider';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = function () {
  return (
    <GlobalContext.Provider value={globalProvider}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RootRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </GlobalContext.Provider>
  );
};

export default App;
