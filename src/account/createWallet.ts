import * as algosdk from 'algosdk';

import { WALLET1 } from '@/constants';
import * as env from '@/env';

const kmdclient = new algosdk.Kmd(env.KMD_TOKEN, env.SERVER, env.KMD_PORT);

(async () => {
  const walletid = (await kmdclient.createWallet(WALLET1, env.TEST_PASSWORD))
    .wallet.id;
  console.log('Wallet:', walletid);

  const wallethandle = (
    await kmdclient.initWalletHandle(walletid, env.TEST_PASSWORD)
  ).wallet_handle_token;
  console.log('Wallet handle:', wallethandle);

  const mdk = (
    await kmdclient.exportMasterDerivationKey(wallethandle, env.TEST_PASSWORD)
  ).master_derivation_key;
  const mdkMn = algosdk.masterDerivationKeyToMnemonic(mdk);
  console.log('Master derivation key as mnemonic:', mdkMn);

  const address = (await kmdclient.generateKey(wallethandle)).address;
  console.log('Created new account:', address);
})().catch((e) => {
  console.error(e);
});
