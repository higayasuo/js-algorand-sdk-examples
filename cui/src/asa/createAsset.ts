import * as algosdk from 'algosdk';

import { createAlgodClient, signSendWaitTxn } from '../utils/algoHelper';
import printCreatedAsset from './printCreatedAsset';

import { test1Account, test2Account } from '../account/accounts';

const createAsset = async () => {
  console.log('Create aseet');

  const algodClient = createAlgodClient();
  const suggestedParams = await algodClient.getTransactionParams().do();

  const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    from: test1Account.addr,
    total: 1000,
    decimals: 0,
    defaultFrozen: false,
    manager: test2Account.addr,
    reserve: test2Account.addr,
    freeze: test2Account.addr,
    clawback: test2Account.addr,
    unitName: 'AAA',
    assetName: 'AAA',
    assetURL: 'https://someurl',
    suggestedParams,
  });

  const ctx = await signSendWaitTxn(algodClient, txn, test1Account.sk);
  const assetID = ctx['asset-index'];

  await printCreatedAsset(test1Account.addr, assetID);

  return assetID;
};

export default createAsset;
