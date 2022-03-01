import type { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { CssBaseline } from '@mui/material';

const queryClient = new QueryClient();

const isProduction = process.env.NODE_ENV !== 'production';

NProgress.configure({
  showSpinner: false,
});

Router.events.on('routeChangeStart', NProgress.start);
Router.events.on('routeChangeComplete', NProgress.done);
Router.events.on('routeChangeError', NProgress.done);

function LetsCollabApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      {isProduction && <ReactQueryDevtools position="bottom-right" />}

      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default LetsCollabApp;
