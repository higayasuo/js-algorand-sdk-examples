import * as algosdk from 'algosdk';
import { createKmdClient } from '@/utils/helper';

import { WALLET1, TEST_PASSWORD } from './constants';

// Paste <account-menmonic>
const mdkMn =
  'harsh lounge usage security gate night erase guilt credit collect grace bunker broccoli middle tell prefer nerve audit render want grape lumber surprise ability talk';

(async () => {
  const kmdClient = createKmdClient();
  const mdk = await algosdk.mnemonicToMasterDerivationKey(mdkMn);

  const walletid = (await kmdClient.createWallet(WALLET1, TEST_PASSWORD, mdk))
    .wallet.id;
  console.log('Recovered wallet: ', walletid);

  const wallethandle = (
    await kmdClient.initWalletHandle(walletid, TEST_PASSWORD)
  ).wallet_handle_token;

  const address = (await kmdClient.generateKey(wallethandle)).address;
  console.log('Recovered account:', address);
})().catch(console.error);
