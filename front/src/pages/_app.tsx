import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';

import '../styles/globals.css';
import ErrorFallback from '../components/ErrorFallback';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={console.error}>
        <div>
          <Head>
            <title>js-algorand-sdk-examples</title>
            <meta name="description" content="js-algorand-sdk-examples" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>
            <Component {...pageProps} />
          </main>
        </div>
      </ErrorBoundary>
    </RecoilRoot>
  );
};

export default MyApp;
