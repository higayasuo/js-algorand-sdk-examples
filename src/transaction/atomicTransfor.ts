import { accountB, algodClient, algosdk } from '@/utils/helper';

import pressKey from '@/utils/pressKey';

const account1 = algosdk.generateAccount();
const account2 = algosdk.generateAccount();
const account3 = algosdk.generateAccount();

const showBlances = async () => {
  for (const addr of [account1.addr, account2.addr, account3.addr]) {
    const info = await algodClient.accountInformation(addr).do();
    console.log(`${addr} balance: ${info.amount} microAlgos`);
  }
};

const submitAtomicTransfer = async () => {
  // get suggested params from the network
  const params = await algodClient.getTransactionParams().do();

  const tx1 = algosdk.makePaymentTxnWithSuggestedParams(
    account1.addr,
    account3.addr,
    100000,
    undefined,
    undefined,
    params
  );

  const tx2 = algosdk.makePaymentTxnWithSuggestedParams(
    account2.addr,
    account1.addr,
    200000,
    undefined,
    undefined,
    params
  );

  const txns = [tx1, tx2];

  // Group both transactions
  algosdk.assignGroupID(txns);

  // Sign each transaction in the group
  const signedTx1 = tx1.signTxn(account1.sk);
  const signedTx2 = tx2.signTxn(account2.sk);

  // Combine the signed transactions
  const signed = [signedTx1, signedTx2];

  const tx = await algodClient.sendRawTransaction(signed).do();
  console.log('Transaction : ' + tx.txId);

  // Wait for transaction to be confirmed
  const confirmedTxn = await algosdk.waitForConfirmation(
    algodClient,
    tx.txId,
    4
  );
  //Get the completed Transaction
  console.log(
    `Transaction ${tx.txId} confirmed in round ${confirmedTxn['confirmed-round']}`
  );
};

const main = async () => {
  console.log('Run the following command');
  console.log(
    `./sandbox goal clerk send -f ${accountB.addr}  -t ${account1.addr} -a 2000000`
  );
  await pressKey();

  console.log('Run the following command');
  console.log(
    `./sandbox goal clerk send -f ${accountB.addr}  -t ${account2.addr} -a 3000000`
  );
  await pressKey();

  await showBlances();
  await submitAtomicTransfer();
  await showBlances();
};

(async () => {
  await main();
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
