import * as algosdk from 'algosdk';

import * as env from '@/env';
import pressKey from '@/utils/pressKey';

const algodClient = new algosdk.Algodv2(env.TOKEN, env.SERVER, env.ALGOD_PORT);

const defaultAddress =
  'OG3FNPVGFB6S5UTN5BMDHNHVX24PM4XGQLXAU7T56MN3NENGUY64X4AXDI';

const accountA = algosdk.generateAccount();
const accountB = algosdk.generateAccount();
const accountC = algosdk.generateAccount();

const showBlances = async () => {
  for (const addr of [accountA.addr, accountB.addr, accountC.addr]) {
    const info = await algodClient.accountInformation(addr).do();
    console.log(`${addr} balance: ${info.amount} microAlgos`);
  }
};

const submitAtomicTransfer = async () => {
  // get suggested params from the network
  const params = await algodClient.getTransactionParams().do();

  // Transaction A to C
  const tx1 = algosdk.makePaymentTxnWithSuggestedParams(
    accountA.addr,
    accountC.addr,
    100000,
    undefined,
    undefined,
    params
  );
  // Create transaction B to A
  const tx2 = algosdk.makePaymentTxnWithSuggestedParams(
    accountB.addr,
    accountA.addr,
    200000,
    undefined,
    undefined,
    params
  );

  const txns = [tx1, tx2];

  // Group both transactions
  algosdk.assignGroupID(txns);

  // Sign each transaction in the group
  const signedTx1 = tx1.signTxn(accountA.sk);
  const signedTx2 = tx2.signTxn(accountB.sk);

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
    `./sandbox goal clerk send -f ${defaultAddress}  -t ${accountA.addr} -a 2000000`
  );
  await pressKey();

  console.log('Run the following command');
  console.log(
    `./sandbox goal clerk send -f ${defaultAddress}  -t ${accountB.addr} -a 3000000`
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
