import * as algosdk from 'algosdk';

import { createAlgodClient, signSendWaitTxn } from '../utils/algoHelper';
import { test1Account, test3Account } from '../account/accounts';

import printCreatedAsset from './printCreatedAsset';
import printAssetHolding from './printAssetHolding';

const destroyAsset = async (assetID: number) => {
  console.log('Destroy asset');

  const algodClient = createAlgodClient();
  const suggestedParams = await algodClient.getTransactionParams().do();

  const txn = algosdk.makeAssetDestroyTxnWithSuggestedParamsFromObject({
    from: test1Account.addr,
    assetIndex: assetID,
    suggestedParams,
  });

  await signSendWaitTxn(algodClient, txn, test1Account.sk);
  await printCreatedAsset(test1Account.addr, assetID);
  await printAssetHolding(test1Account.addr, assetID);
  await printAssetHolding(test3Account.addr, assetID);
};

export default destroyAsset;
