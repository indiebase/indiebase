import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from 'react-query';
import { route } from '@/route';
import { GlobalContext, globalProvider } from './provider';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

const App = function () {
  return (
    <div
      id="pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <GlobalContext.Provider value={globalProvider}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            
              <Routes>
                {/* {route.map((r, i) => {
                  return <Route key={i} {...r} />;
                })} */}
              </Routes>
            
          </BrowserRouter>
        </QueryClientProvider>
      </GlobalContext.Provider>
    </div>
  );
};

export default App;
