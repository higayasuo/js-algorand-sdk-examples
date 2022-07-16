import * as algosdk from 'algosdk';

import {
  accountA,
  accountB,
  accountC,
  createAlgodClient,
  signSendWaitTxn,
} from '@/utils/algoHelper';
import printAssetHolding from './printAssetHolding';

const revokeAsset = async (assetIndex: number) => {
  console.log('Revoke asset:', accountC.addr);

  const algodClient = createAlgodClient();
  const suggestedParams = await algodClient.getTransactionParams().do();

  const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: accountB.addr,
    to: accountA.addr,
    revocationTarget: accountC.addr,
    amount: 10,
    assetIndex,
    suggestedParams,
  });

  await signSendWaitTxn(algodClient, txn, accountB.sk);
  await printAssetHolding(accountC.addr, assetIndex);
};

export default revokeAsset;
