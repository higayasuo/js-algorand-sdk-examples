import * as algosdk from 'algosdk';

import * as env from 'env';

const kmdclient = new algosdk.Kmd(env.KMD_TOKEN, env.SERVER, env.KMD_PORT);

// Paste <wallet-menmonic>
const mdkMn =
  'broken weather speak culture price regular army subway grape dentist desert gadget sick hollow kitten charge crucial crunch expect focus visit caught spare above robot';

(async () => {
  const mdk = await algosdk.mnemonicToMasterDerivationKey(mdkMn);

  const walletid = (
    await kmdclient.createWallet('MyTestWallet1', env.TEST_PASSWORD, mdk)
  ).wallet.id;
  console.log('Recovered wallet: ', walletid);

  const wallethandle = (
    await kmdclient.initWalletHandle(walletid, env.TEST_PASSWORD)
  ).wallet_handle_token;

  const address = (await kmdclient.generateKey(wallethandle)).address;
  console.log('Recovered account:', address);
})().catch((e) => {
  console.error(e);
});
