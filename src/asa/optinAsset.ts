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
  const suggestedParams = await algodClient.getTransactionParams().do();

  const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: accountC.addr,
    to: accountC.addr,
    amount: 0,
    assetIndex,
    suggestedParams,
  });

  await signSendWaitTxn(algodClient, txn, accountC.sk);
  await printAssetHolding(accountC.addr, assetIndex);
};

export default optinAsset;
