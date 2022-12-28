// import './App.less';
import { router } from './Router';
import { Provider, useAtom } from 'jotai';
import { RouterProvider } from 'react-router-dom';
import { useAtomsDebugValue } from 'jotai/devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { userProfileAtom, fetchUserProfile } from '@letscollab/console-utils';
import { PropsWithChildren, useEffect } from 'react';
import { queryClientAtom } from 'jotai-tanstack-query';
import { AuthzProvider, Can } from '@letscollab/react-authz';

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

function InitializeUser(props: PropsWithChildren) {
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);

  useEffect(() => {
    fetchUserProfile().then((data) => {
      setUserProfile(data.d);
    });
  }, []);

  return <>{userProfile ? props.children : null}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools
        initialIsOpen={!isProduction}
        position="bottom-right"
      />
      <Provider initialValues={[[queryClientAtom, queryClient]] as const}>
        <DebugAtoms />
        <InitializeUser>
          <AuthzProvider mode="manual" possess={{ read: ['data1', 'data2'] }}>
            <Can i="read" the="data1">
              <RouterProvider router={router} />
            </Can>
          </AuthzProvider>
        </InitializeUser>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
