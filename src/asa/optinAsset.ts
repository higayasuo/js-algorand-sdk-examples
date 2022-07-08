import { accountC, algodClient, algosdk, sendTxnAndWait } from '@/utils/helper';
import printAssetHolding from './printAssetHolding';

const optinAsset = async (assetIndex: number) => {
  console.log('Opt-in asset:', accountC.addr);

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

  await sendTxnAndWait(txn, accountC.sk);
  await printAssetHolding(accountC.addr, assetIndex);
};

export default optinAsset;
