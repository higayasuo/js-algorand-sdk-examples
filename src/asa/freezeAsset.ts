import * as algosdk from 'algosdk';

import {
  accountB,
  accountC,
  createAlgodClient,
  sendTxnAndWait,
} from '@/utils/algoHelper';
import printAssetHolding from './printAssetHolding';

const freezeAsset = async (assetIndex: number) => {
  console.log('Freeze asset:', accountC.addr);

  const algodClient = createAlgodClient();
  const params = await algodClient.getTransactionParams().do();

  const sender = accountB.addr;
  const freezeTarget = accountC.addr;
  const freezeState = true;

  const txn = algosdk.makeAssetFreezeTxnWithSuggestedParams(
    sender,
    undefined,
    assetIndex,
    freezeTarget,
    freezeState,
    params
  );

  await sendTxnAndWait(algodClient, txn, accountB.sk);
  await printAssetHolding(accountC.addr, assetIndex);
};

export default freezeAsset;
