import {
  accountA,
  accountB,
  accountC,
  algodClient,
  algosdk,
  sendTxnAndWait,
} from '@/utils/helper';
import printAssetHolding from './printAssetHolding';

const revokeAsset = async (assetIndex: number) => {
  console.log('Revoke asset:', accountC.addr);

  const params = await algodClient.getTransactionParams().do();

  const sender = accountB.addr;
  const receiver = accountA.addr;
  const revocationTarget = accountC.addr;
  const amount = 10;

  const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
    sender,
    receiver,
    undefined,
    revocationTarget,
    amount,
    undefined,
    assetIndex,
    params
  );

  await sendTxnAndWait(txn, accountB.sk);
  await printAssetHolding(accountC.addr, assetIndex);
};

export default revokeAsset;
