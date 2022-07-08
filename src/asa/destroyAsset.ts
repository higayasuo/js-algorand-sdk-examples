import { accountA, algodClient, algosdk, sendTxnAndWait } from '@/utils/helper';
import printCreatedAsset from './printCreatedAsset';

const destroyAsset = async (assetIndex: number) => {
  console.log('Destroy asset');

  const params = await algodClient.getTransactionParams().do();

  const sender = accountA.addr;

  const txn = algosdk.makeAssetDestroyTxnWithSuggestedParams(
    sender,
    undefined,
    assetIndex,
    params
  );

  await sendTxnAndWait(txn, accountA.sk);
  await printCreatedAsset(accountA.addr, assetIndex);
};

export default destroyAsset;
