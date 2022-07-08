import {
  accountA,
  accountB,
  algodClient,
  algosdk,
  sendTxnAndWait,
} from '@/utils/helper';
import printCreatedAsset from './printCreatedAsset';

const modifyAsset = async (assetIndex: number) => {
  const params = await algodClient.getTransactionParams().do();

  const manager = accountA.addr;
  const reserve = accountB.addr;
  const freeze = accountB.addr;
  const clawback = accountB.addr;

  const txn = algosdk.makeAssetConfigTxnWithSuggestedParams(
    accountB.addr,
    undefined,
    assetIndex,
    manager,
    reserve,
    freeze,
    clawback,
    params
  );

  await sendTxnAndWait(txn, accountA.sk);
  await printCreatedAsset(accountA.addr, assetIndex);
};

export default modifyAsset;
