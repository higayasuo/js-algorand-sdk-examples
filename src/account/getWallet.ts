import { kmdClient, WALLET1 } from '@/utils/helper';

const getWallet = async (name: string) => {
  const wallets = (await kmdClient.listWallets()).wallets;
  const wallet = wallets.find((w) => w.name === name);

  if (!wallet) {
    throw new Error(`Wallet was not found: ${name}`);
  }

  return wallet.id;
};

const main = async () => {
  console.log(await getWallet(WALLET1));
};

if (require.main === module) {
  (async () => {
    await main();
    process.exit();
  })().catch((e) => {
    console.error(e);
  });
}

export default getWallet;
