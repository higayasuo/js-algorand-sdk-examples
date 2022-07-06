import { algosdk, kmdClient, TEST_PASSWORD } from '@/utils/helper';

import { WALLET1 } from '@/constants';

(async () => {
  const walletid = (await kmdClient.createWallet(WALLET1, TEST_PASSWORD)).wallet
    .id;
  console.log('Wallet:', walletid);

  const wallethandle = (
    await kmdClient.initWalletHandle(walletid, TEST_PASSWORD)
  ).wallet_handle_token;
  console.log('Wallet handle:', wallethandle);

  const mdk = (
    await kmdClient.exportMasterDerivationKey(wallethandle, TEST_PASSWORD)
  ).master_derivation_key;
  const mdkMn = algosdk.masterDerivationKeyToMnemonic(mdk);
  console.log('Master derivation key as mnemonic:', mdkMn);

  const address = (await kmdClient.generateKey(wallethandle)).address;
  console.log('Created new account:', address);
})().catch(console.error);
