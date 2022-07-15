import fs from 'fs';

import * as algosdk from 'algosdk';

import {
  accountA,
  accountB,
  createAlgodClient,
  signSendWaitTxn,
} from '@/utils/algoHelper';

const main = async () => {
  const algodClient = createAlgodClient();
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

  await signSendWaitTxn(algodClient, txnFromFile, accountA.sk);
};

(async () => {
  await main();
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
