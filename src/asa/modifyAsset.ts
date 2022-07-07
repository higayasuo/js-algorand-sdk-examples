import { accountA, accountB, algodClient, algosdk } from '@/utils/helper';
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

  const rawSignedTxn = txn.signTxn(accountA.sk);
  const tx = await algodClient.sendRawTransaction(rawSignedTxn).do();
  const ptx = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);

  console.log(
    'Transaction ' + tx.txId + ' confirmed in round ' + ptx['confirmed-round']
  );

  printCreatedAsset(accountA.addr, assetIndex);
};

export default modifyAsset;
