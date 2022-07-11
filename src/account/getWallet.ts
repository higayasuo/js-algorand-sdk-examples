import { createKmdClient } from '@/utils/helper';

import { WALLET1 } from './constants';

const getWallet = async (name: string) => {
  const kmdClient = createKmdClient();
  const wallets = (await kmdClient.listWallets()).wallets;
  const wallet = wallets.find((w) => w.name === name);

  if (!wallet) {
    throw new Error('Wallet was not found: ${name}');
  }

  return wallet.id;
};

const main = async () => {
  console.log(await getWallet(WALLET1));
};

if (require.main === module) {
  (async () => {
    await main();
    process.exit(0);
  })().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

export default getWallet;
