import {
  accountA,
  accountB,
  accountC,
  algodClient,
  algosdk,
  sendRawTxnAndWait,
} from '@/utils/helper';

const submitAtomicTransfer = async () => {
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

  const txns = [txn1, txn2];

  algosdk.assignGroupID(txns);

  const signedTxn1 = txn1.signTxn(accountA.sk);
  const signedTxn2 = txn2.signTxn(accountB.sk);
  const signedTxns = [signedTxn1, signedTxn2];

  await sendRawTxnAndWait(signedTxns);
};

const main = async () => {
  await submitAtomicTransfer();
};

(async () => {
  await main();
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
