import * as algosdk from 'algosdk';

import { createAlgodClient, signSendWaitTxn } from '../utils/algoHelper';
import { test3Account } from '../account/accounts';

import printAssetHolding from './printAssetHolding';

const optinAsset = async (assetID: number) => {
  console.log('Opt-in asset:', test3Account.addr);

  const algodClient = createAlgodClient();
  const suggestedParams = await algodClient.getTransactionParams().do();

  const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: test3Account.addr,
    to: test3Account.addr,
    amount: 0,
    assetIndex: assetID,
    suggestedParams,
  });

  await signSendWaitTxn(algodClient, txn, test3Account.sk);
  await printAssetHolding(test3Account.addr, assetID);
};

export default optinAsset;
