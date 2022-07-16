import * as algosdk from 'algosdk';

import {
  accountA,
  accountB,
  createAlgodClient,
  signSendWaitTxn,
} from '@/utils/algoHelper';
import printCreatedAsset from './printCreatedAsset';

const createAsset = async () => {
  console.log('Create aseet');

  const algodClient = createAlgodClient();
  const suggestedParams = await algodClient.getTransactionParams().do();

  const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    from: accountA.addr,
    total: 1000,
    decimals: 0,
    defaultFrozen: false,
    manager: accountB.addr,
    reserve: accountB.addr,
    freeze: accountB.addr,
    clawback: accountB.addr,
    unitName: 'AAA',
    assetName: 'AAA',
    assetURL: 'https://someurl',
    suggestedParams,
  });

  const ctx = await signSendWaitTxn(algodClient, txn, accountA.sk);
  const assetIndex = ctx['asset-index'];

  await printCreatedAsset(accountA.addr, assetIndex);

  return assetIndex;
};

export default createAsset;
