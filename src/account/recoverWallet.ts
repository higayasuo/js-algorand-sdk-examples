import * as algosdk from 'algosdk';
import { createKmdClient } from '@/utils/algoHelper';

import { WALLET1, TEST_PASSWORD } from './constants';

// Paste <account-menmonic>
const mdkMn =
  'draw ladder jar segment seminar force spy achieve stage market sun fiction wear devote deliver plate oppose solid acquire elbow hazard clog veteran absorb another';

(async () => {
  const kmdClient = createKmdClient();
  const mdk = await algosdk.mnemonicToMasterDerivationKey(mdkMn);

  const walletid = (await kmdClient.createWallet(WALLET1, TEST_PASSWORD, mdk))
    .wallet.id;

  const wallethandle = (
    await kmdClient.initWalletHandle(walletid, TEST_PASSWORD)
  ).wallet_handle_token;

  const address = (await kmdClient.generateKey(wallethandle)).address;
  console.log('Recovered account:', address);
})().catch(console.error);
