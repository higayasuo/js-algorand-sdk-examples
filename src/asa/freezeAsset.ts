import * as algosdk from 'algosdk';

import {
  accountB,
  accountC,
  createAlgodClient,
  signSendWaitTxn,
} from '@/utils/algoHelper';
import printAssetHolding from './printAssetHolding';

const freezeAsset = async (assetIndex: number) => {
  console.log('Freeze asset:', accountC.addr);

  const algodClient = createAlgodClient();
  const suggestedParams = await algodClient.getTransactionParams().do();

  const txn = algosdk.makeAssetFreezeTxnWithSuggestedParamsFromObject({
    from: accountB.addr,
    assetIndex,
    freezeTarget: accountC.addr,
    freezeState: true,
    suggestedParams,
  });

  await signSendWaitTxn(algodClient, txn, accountB.sk);
  await printAssetHolding(accountC.addr, assetIndex);
};

export default freezeAsset;
