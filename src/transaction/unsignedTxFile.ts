import fs from 'fs';

import {
  accountA,
  accountB,
  algodClient,
  algosdk,
  sendTxnAndWait,
} from '@/utils/helper';

const submitTransaction = async () => {
  const params = await algodClient.getTransactionParams().do();

  const txn = algosdk.makePaymentTxnWithSuggestedParams(
    accountA.addr,
    accountB.addr,
    1000,
    undefined,
    undefined,
    params
  );

  fs.writeFileSync('./unsigned.txn', algosdk.encodeUnsignedTransaction(txn));

  const txnFromFile = algosdk.decodeUnsignedTransaction(
    fs.readFileSync('./unsigned.txn')
  );
  fs.unlinkSync('./unsigned.txn');

  await sendTxnAndWait(txnFromFile, accountA.sk);
};

const main = async () => {
  await submitTransaction();
};

(async () => {
  await main();
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
