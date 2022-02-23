import { BrowserRouter } from 'react-router-dom';
import { AppRootRoutes } from './AppRootRoutes';
import { GlobalContext, globalProvider } from './provider';
import { QueryClient, QueryClientProvider } from 'react-query';
import themes from './themes';
import { CssBaseline } from '@mui/material';
import ThemeProvider from '@mui/system/ThemeProvider';

const queryClient = new QueryClient();

const App = function () {
  return (
    <GlobalContext.Provider value={globalProvider}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={themes()}>
          <CssBaseline />
          <BrowserRouter>
            <AppRootRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </GlobalContext.Provider>
  );
};

export default App;
