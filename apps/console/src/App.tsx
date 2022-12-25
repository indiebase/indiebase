import { RouterProvider } from 'react-router-dom';
import { queryClientAtom } from 'jotai/query';
import { router } from './Router';
import { Provider, useAtom } from 'jotai';
import { useAtomsDebugValue } from 'jotai/devtools';
import './App.less';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { userProfileAtom, fetchUserProfile } from '@letscollab/console-utils';
import { PropsWithChildren, ReactElement, ReactNode, useEffect } from 'react';

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

function InitUser(props: PropsWithChildren) {
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
      <Provider initialValues={[[queryClientAtom, queryClient] as any]}>
        <DebugAtoms />
        <InitUser>
          <RouterProvider router={router} />
        </InitUser>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
