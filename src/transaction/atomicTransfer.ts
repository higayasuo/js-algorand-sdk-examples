import * as algosdk from 'algosdk';

import {
  accountA,
  accountB,
  accountC,
  createAlgodClient,
  sendRawTxnAndWait,
} from '@/utils/algoHelper';

const main = async () => {
  const algodClient = createAlgodClient();
  const params = await algodClient.getTransactionParams().do();

  const txn1 = algosdk.makePaymentTxnWithSuggestedParams(
    accountA.addr,
    accountC.addr,
    100000,
    undefined,
    undefined,
    params
  );

  const txn2 = algosdk.makePaymentTxnWithSuggestedParams(
    accountB.addr,
    accountA.addr,
    200000,
    undefined,
    undefined,
    params
  );

  algosdk.assignGroupID([txn1, txn2]);

  const signedTxn1 = txn1.signTxn(accountA.sk);
  const signedTxn2 = txn2.signTxn(accountB.sk);

  await sendRawTxnAndWait(algodClient, [signedTxn1, signedTxn2]);
};

(async () => {
  await main();
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
