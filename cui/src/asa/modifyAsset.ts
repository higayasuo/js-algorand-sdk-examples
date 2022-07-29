import * as algosdk from 'algosdk';

import { createAlgodClient, signSendWaitTxn } from '../utils/algoHelper';
import { test1Account, test2Account } from '../account/accounts';

import printCreatedAsset from './printCreatedAsset';

const modifyAsset = async (assetID: number) => {
  console.log('Modify asset');

  const algodClient = createAlgodClient();
  const suggestedParams = await algodClient.getTransactionParams().do();

  const txn = algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject({
    from: test2Account.addr,
    assetIndex: assetID,
    manager: test1Account.addr,
    reserve: test2Account.addr,
    freeze: test2Account.addr,
    clawback: test2Account.addr,
    suggestedParams,
  });

  await signSendWaitTxn(algodClient, txn, test2Account.sk);
  await printCreatedAsset(test1Account.addr, assetID);
};

export default modifyAsset;
