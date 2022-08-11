import * as algosdk from 'algosdk';

import { createAlgodClient, signSendWaitTxn } from '../utils/algoHelper';
import { test1Account } from '../account/accounts';

const destroyAsset = async (assetID: number) => {
  console.log('Destroy asset:', assetID);

  const algodClient = createAlgodClient();
  const suggestedParams = await algodClient.getTransactionParams().do();

  const txn = algosdk.makeAssetDestroyTxnWithSuggestedParamsFromObject({
    from: test1Account.addr,
    assetIndex: assetID,
    suggestedParams,
  });

  await signSendWaitTxn(algodClient, txn, test1Account.sk);
};

const main = async () => {
  if (process.argv.length != 3) {
    console.warn('Usage: yarn ts-node src/cleanup/destroyAsset.ts assetID');
    process.exit(1);
  }

  const assetID = Number(process.argv[2]);

  await destroyAsset(assetID);
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
