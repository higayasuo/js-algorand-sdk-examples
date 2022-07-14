import * as algosdk from 'algosdk';

import {
  accountA,
  accountB,
  createAlgodClient,
  sendTxnAndWait,
} from '@/utils/algoHelper';
import printCreatedAsset from './printCreatedAsset';

const modifyAsset = async (assetIndex: number) => {
  console.log('Modify asset');

  const algodClient = createAlgodClient();
  const params = await algodClient.getTransactionParams().do();

  const sender = accountB.addr;
  const manager = accountA.addr;
  const reserve = accountB.addr;
  const freeze = accountB.addr;
  const clawback = accountB.addr;

  const txn = algosdk.makeAssetConfigTxnWithSuggestedParams(
    sender,
    undefined,
    assetIndex,
    manager,
    reserve,
    freeze,
    clawback,
    params
  );

  await sendTxnAndWait(algodClient, txn, accountB.sk);
  await printCreatedAsset(accountA.addr, assetIndex);
};

export default modifyAsset;
