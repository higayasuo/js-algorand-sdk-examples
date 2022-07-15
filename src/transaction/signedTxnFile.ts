import fs from 'fs';

import * as algosdk from 'algosdk';

import {
  accountA,
  accountB,
  createAlgodClient,
  sendWaitTxn,
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

  const signedTxn = txn.signTxn(accountA.sk);
  fs.writeFileSync('./signed.stxn', signedTxn);

  const signedTxnFromFile = fs.readFileSync('./signed.stxn');
  fs.unlinkSync('./signed.stxn');

  await sendWaitTxn(algodClient, signedTxnFromFile);
};

(async () => {
  await main();
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
