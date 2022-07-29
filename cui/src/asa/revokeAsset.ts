import * as algosdk from 'algosdk';

import { createAlgodClient, signSendWaitTxn } from '../utils/algoHelper';
import { test1Account, test2Account, test3Account } from '../account/accounts';

import printAssetHolding from './printAssetHolding';

const revokeAsset = async (assetID: number) => {
  console.log('Revoke asset:', test3Account.addr);

  const algodClient = createAlgodClient();
  const suggestedParams = await algodClient.getTransactionParams().do();

  const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: test2Account.addr,
    to: test1Account.addr,
    revocationTarget: test3Account.addr,
    amount: 10,
    assetIndex: assetID,
    suggestedParams,
  });

  await signSendWaitTxn(algodClient, txn, test2Account.sk);
  await printAssetHolding(test1Account.addr, assetID);
  await printAssetHolding(test3Account.addr, assetID);
};

export default revokeAsset;
