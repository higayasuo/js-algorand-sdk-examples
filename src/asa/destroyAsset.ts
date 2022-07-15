import * as algosdk from 'algosdk';

import {
  accountA,
  createAlgodClient,
  signSendWaitTxn,
} from '@/utils/algoHelper';
import printCreatedAsset from './printCreatedAsset';

const destroyAsset = async (assetIndex: number) => {
  console.log('Destroy asset');

  const algodClient = createAlgodClient();
  const params = await algodClient.getTransactionParams().do();

  const sender = accountA.addr;

  const txn = algosdk.makeAssetDestroyTxnWithSuggestedParams(
    sender,
    undefined,
    assetIndex,
    params
  );

  await signSendWaitTxn(algodClient, txn, accountA.sk);
  await printCreatedAsset(accountA.addr, assetIndex);
};

export default destroyAsset;
