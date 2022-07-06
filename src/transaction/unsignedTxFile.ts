import fs from 'fs';

import { accountA, accountB, algodClient, algosdk } from '@/utils/helper';

const submitTransaction = async () => {
  // get suggested params from the network
  const params = await algodClient.getTransactionParams().do();

  const txn = algosdk.makePaymentTxnWithSuggestedParams(
    accountA.addr,
    accountB.addr,
    1000,
    undefined,
    undefined,
    params
  );
  // Save transaction to file
  fs.writeFileSync('./unsigned.txn', algosdk.encodeUnsignedTransaction(txn));

  // read transaction from file and sign it
  const txn2 = algosdk.decodeUnsignedTransaction(
    fs.readFileSync('./unsigned.txn')
  );
  fs.unlinkSync('./unsigned.txn');

  const signedTxn = algosdk.signTransaction(txn2, accountA.sk);
  const txId = signedTxn.txID;
  console.log('Signed transaction with txID: %s', txId);
  // send signed transaction to node
  await algodClient.sendRawTransaction(signedTxn.blob).do();
  // Wait for transaction to be confirmed
  const confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
  //Get the completed Transaction
  console.log(
    'Transaction ' +
      txId +
      ' confirmed in round ' +
      confirmedTxn['confirmed-round']
  );
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
