import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';

import '../styles/globals.css';
import ErrorFallback from '../components/ErrorFallback';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={console.error}>
        <Component {...pageProps} />
      </ErrorBoundary>
    </RecoilRoot>
  );
};

export default MyApp;
