import algosdk from 'algosdk';

import { createAlgodClient, signSendWaitTxn } from '../utils/algoHelper';
import { test2Account, test3Account } from '../account/accounts';

import printAssetHolding from './printAssetHolding';

const freezeAsset = async (assetID: number) => {
  console.log('Freeze asset:', test3Account.addr);

  const algodClient = createAlgodClient();
  const suggestedParams = await algodClient.getTransactionParams().do();

  const txn = algosdk.makeAssetFreezeTxnWithSuggestedParamsFromObject({
    from: test2Account.addr,
    assetIndex: assetID,
    freezeTarget: test3Account.addr,
    freezeState: true,
    suggestedParams,
  });

  await signSendWaitTxn(algodClient, txn, test2Account.sk);
  await printAssetHolding(test3Account.addr, assetID);
};

export default freezeAsset;
