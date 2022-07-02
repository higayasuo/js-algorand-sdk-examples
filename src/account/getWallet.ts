import * as algosdk from 'algosdk';

import { WALLET1 } from '@/constants';
import * as env from '@/env';

const kmdclient = new algosdk.Kmd(env.KMD_TOKEN, env.SERVER, env.KMD_PORT);

const getWallet = async (name: string) => {
  const wallets = (await kmdclient.listWallets()).wallets;
  const wallet = wallets.find((w) => w.name === name);

  if (!wallet) {
    throw new Error(`Wallet was not found: ${name}`);
  }

  return wallet.id;
};

(async () => {
  console.log(await getWallet(WALLET1));
})().catch((e) => {
  console.error(e);
});

export default getWallet;
