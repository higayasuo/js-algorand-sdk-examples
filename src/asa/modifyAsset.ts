import * as algosdk from 'algosdk';

import {
  accountA,
  accountB,
  createAlgodClient,
  signSendWaitTxn,
} from '@/utils/algoHelper';
import printCreatedAsset from './printCreatedAsset';

const modifyAsset = async (assetIndex: number) => {
  console.log('Modify asset');

  const algodClient = createAlgodClient();
  const suggestedParams = await algodClient.getTransactionParams().do();

  const txn = algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject({
    from: accountB.addr,
    assetIndex,
    manager: accountA.addr,
    reserve: accountB.addr,
    freeze: accountB.addr,
    clawback: accountB.addr,
    suggestedParams,
  });

  await signSendWaitTxn(algodClient, txn, accountB.sk);
  await printCreatedAsset(accountA.addr, assetIndex);
};

export default modifyAsset;
