import type { NextPage } from 'next';
import Head from 'next/head';

import Main from '../components/Main';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>js-algorand-sdk-examples</title>
        <meta name="description" content="js-algorand-sdk-examples" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Main />
      </main>
    </div>
  );
};

export default Home;
