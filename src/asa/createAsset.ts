import * as algosdk from 'algosdk';

import {
  accountA,
  accountB,
  createAlgodClient,
  sendTxnAndWait,
} from '@/utils/algoHelper';
import printCreatedAsset from './printCreatedAsset';

const createAsset = async () => {
  console.log('Create aseet');

  const algodClient = createAlgodClient();
  const params = await algodClient.getTransactionParams().do();

  const defaultFrozen = false;
  const decimals = 0;
  const totalIssuance = 1000;
  const unitName = 'LATINUM';
  const assetName = 'latinum';
  const assetURL = 'http://someurl';
  const assetMetadataHash = '16efaa3924a6fd9d3a4824799a4ac65d';
  const manager = accountB.addr;
  const reserve = accountB.addr;
  const freeze = accountB.addr;
  const clawback = accountB.addr;

  const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
    accountA.addr,
    undefined,
    totalIssuance,
    decimals,
    defaultFrozen,
    manager,
    reserve,
    freeze,
    clawback,
    unitName,
    assetName,
    assetURL,
    assetMetadataHash,
    params
  );

  const ctx = await sendTxnAndWait(algodClient, txn, accountA.sk);
  const assetIndex = ctx['asset-index'];

  await printCreatedAsset(accountA.addr, assetIndex);

  return assetIndex;
};

export default createAsset;
