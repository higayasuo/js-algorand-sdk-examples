import { accountA, accountC, algodClient, algosdk } from '@/utils/helper';
import printAssetHolding from './printAssetHolding';

const optinAsset = async (assetIndex: number) => {
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

  const rawSignedTxn = txn.signTxn(accountA.sk);
  const tx = await algodClient.sendRawTransaction(rawSignedTxn).do();
  const ctx = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);

  console.log(
    'Transaction ' + tx.txId + ' confirmed in round ' + ctx['confirmed-round']
  );

  await printAssetHolding(accountC.addr, assetIndex);
};

export default optinAsset;
