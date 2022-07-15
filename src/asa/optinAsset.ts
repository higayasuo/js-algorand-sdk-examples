import * as algosdk from 'algosdk';

import {
  accountC,
  createAlgodClient,
  signSendWaitTxn,
} from '@/utils/algoHelper';
import printAssetHolding from './printAssetHolding';

const optinAsset = async (assetIndex: number) => {
  console.log('Opt-in asset:', accountC.addr);

  const algodClient = createAlgodClient();
  const params = await algodClient.getTransactionParams().do();

  const sender = accountC.addr;
  const receiver = sender;
  const amount = 0;

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

  await signSendWaitTxn(algodClient, txn, accountC.sk);
  await printAssetHolding(accountC.addr, assetIndex);
};

export default optinAsset;
