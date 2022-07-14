import * as algosdk from 'algosdk';

import {
  accountA,
  accountC,
  createAlgodClient,
  sendTxnAndWait,
} from '@/utils/algoHelper';
import printAssetHolding from './printAssetHolding';

const transferAsset = async (assetIndex: number) => {
  console.log('Transfer asset:', accountC.addr);

  const algodClient = createAlgodClient();
  const params = await algodClient.getTransactionParams().do();

  const sender = accountA.addr;
  const receiver = accountC.addr;
  const amount = 10;

  const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
    sender,
    receiver,
    undefined,
    undefined,
    amount,
    undefined,
    assetIndex,
    params
  );

  await sendTxnAndWait(algodClient, txn, accountA.sk);
  await printAssetHolding(accountC.addr, assetIndex);
};

export default transferAsset;
