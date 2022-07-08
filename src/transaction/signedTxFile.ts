import fs from 'fs';

import {
  accountA,
  accountB,
  algodClient,
  algosdk,
  sendRawTxnAndWait,
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

  const signedTxn = txn.signTxn(accountA.sk);
  fs.writeFileSync('./signed.stxn', signedTxn);

  const signedTxnFromFile = fs.readFileSync('./signed.stxn');
  fs.unlinkSync('./signed.stxn');

  await sendRawTxnAndWait(signedTxnFromFile);
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
