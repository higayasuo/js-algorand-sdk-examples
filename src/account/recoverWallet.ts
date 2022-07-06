import { algosdk, kmdClient, TEST_PASSWORD, WALLET1 } from '@/utils/helper';

// Paste <account-menmonic>
const mdkMn =
  'broken weather speak culture price regular army subway grape dentist desert gadget sick hollow kitten charge crucial crunch expect focus visit caught spare above robot';

(async () => {
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
