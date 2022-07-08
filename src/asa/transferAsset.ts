import {
  accountA,
  accountC,
  algodClient,
  algosdk,
  sendTxnAndWait,
} from '@/utils/helper';
import printAssetHolding from './printAssetHolding';

const optinAsset = async (assetIndex: number) => {
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

  await sendTxnAndWait(txn, accountA.sk);
  await printAssetHolding(accountC.addr, assetIndex);
};

export default optinAsset;
