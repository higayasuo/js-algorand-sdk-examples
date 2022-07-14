import * as algosdk from 'algosdk';

import { createKmdClient } from '@/utils/algoHelper';

import { WALLET1, TEST_PASSWORD } from './constants';

const main = async () => {
  const kmdClient = createKmdClient();

  const walletid = (await kmdClient.createWallet(WALLET1, TEST_PASSWORD)).wallet
    .id;

  const wallethandle = (
    await kmdClient.initWalletHandle(walletid, TEST_PASSWORD)
  ).wallet_handle_token;

  const mdk = (
    await kmdClient.exportMasterDerivationKey(wallethandle, TEST_PASSWORD)
  ).master_derivation_key;
  const mdkMn = algosdk.masterDerivationKeyToMnemonic(mdk);
  console.log('Master derivation key as mnemonic:', mdkMn);

  const address = (await kmdClient.generateKey(wallethandle)).address;
  console.log('Created new account:', address);
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
