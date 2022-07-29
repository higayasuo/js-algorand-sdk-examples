import * as algosdk from 'algosdk';

import { createAlgodClient, signSendWaitTxn } from '../utils/algoHelper';
import { test1Account, test3Account } from '../account/accounts';

import printAssetHolding from './printAssetHolding';

const transferAsset = async (assetID: number) => {
  console.log('Transfer asset:', test3Account.addr);

  const algodClient = createAlgodClient();
  const suggestedParams = await algodClient.getTransactionParams().do();

  const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: test1Account.addr,
    to: test3Account.addr,
    amount: 10,
    assetIndex: assetID,
    suggestedParams,
  });

  await signSendWaitTxn(algodClient, txn, test1Account.sk);
  await printAssetHolding(test1Account.addr, assetID);
  await printAssetHolding(test3Account.addr, assetID);
};

export default transferAsset;
