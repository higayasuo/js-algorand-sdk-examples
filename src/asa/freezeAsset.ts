import {
  accountB,
  accountC,
  algodClient,
  algosdk,
  sendTxnAndWait,
} from '@/utils/helper';
import printAssetHolding from './printAssetHolding';

const freezeAsset = async (assetIndex: number) => {
  console.log('Freeze asset:', accountC.addr);

  const params = await algodClient.getTransactionParams().do();

  const sender = accountB.addr;
  const freezeTarget = accountC.addr;
  const freezeState = true;

  const txn = algosdk.makeAssetFreezeTxnWithSuggestedParams(
    sender,
    undefined,
    assetIndex,
    freezeTarget,
    freezeState,
    params
  );

  await sendTxnAndWait(txn, accountB.sk);
  await printAssetHolding(accountC.addr, assetIndex);
};

export default freezeAsset;
