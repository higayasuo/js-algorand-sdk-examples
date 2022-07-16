import * as algosdk from 'algosdk';

import {
  accountA,
  accountC,
  createAlgodClient,
  signSendWaitTxn,
} from '@/utils/algoHelper';
import printAssetHolding from './printAssetHolding';

const transferAsset = async (assetIndex: number) => {
  console.log('Transfer asset:', accountC.addr);

  const algodClient = createAlgodClient();
  const suggestedParams = await algodClient.getTransactionParams().do();

  const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: accountA.addr,
    to: accountC.addr,
    amount: 10,
    assetIndex,
    suggestedParams,
  });

  await signSendWaitTxn(algodClient, txn, accountA.sk);
  await printAssetHolding(accountC.addr, assetIndex);
};

export default transferAsset;
