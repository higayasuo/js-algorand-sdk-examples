import * as algosdk from 'algosdk';

import {
  accountA,
  accountC,
  createAlgodClient,
  signSendWaitTxn,
} from '@/utils/algoHelper';
import printCreatedAsset from './printCreatedAsset';
import printAssetHolding from './printAssetHolding';

const destroyAsset = async (assetIndex: number) => {
  console.log('Destroy asset');

  const algodClient = createAlgodClient();
  const suggestedParams = await algodClient.getTransactionParams().do();

  const txn = algosdk.makeAssetDestroyTxnWithSuggestedParamsFromObject({
    from: accountA.addr,
    assetIndex,
    suggestedParams,
  });

  await signSendWaitTxn(algodClient, txn, accountA.sk);
  await printCreatedAsset(accountA.addr, assetIndex);
  await printAssetHolding(accountC.addr, assetIndex);
};

export default destroyAsset;
