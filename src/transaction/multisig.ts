import * as algosdk from 'algosdk';

import * as env from '@/env';
import pressKey from '@/utils/pressKey';

const algodClient = new algosdk.Algodv2(env.TOKEN, env.SERVER, env.ALGOD_PORT);

const defaultAddress =
  'OG3FNPVGFB6S5UTN5BMDHNHVX24PM4XGQLXAU7T56MN3NENGUY64X4AXDI';

const accountA = algosdk.generateAccount();
const accountB = algosdk.generateAccount();
const accountC = algosdk.generateAccount();

const mparams = {
  version: 1,
  threshold: 2,
  addrs: [accountA.addr, accountB.addr, accountC.addr],
};

const multisigAddr = algosdk.multisigAddress(mparams);
console.log('Multisig Address: ' + multisigAddr);

const sendFund = async () => {
  console.log('Run the following command');
  console.log(
    `./sandbox goal clerk send -f ${defaultAddress}  -t ${multisigAddr} -a 2000000`
  );
  await pressKey();
};

const submitMultisig = async () => {
  // get suggested params from the network
  const params = await algodClient.getTransactionParams().do();

  const receiver = accountC.addr;

  const txn = algosdk.makePaymentTxnWithSuggestedParams(
    multisigAddr,
    receiver,
    100000,
    undefined,
    undefined,
    params
  );
  const txId = txn.txID().toString();
  // console.log('Transaction : ' + txId);
  // Sign with first signature

  const rawSignedTxn = algosdk.signMultisigTransaction(
    txn,
    mparams,
    accountA.sk
  ).blob;
  //sign with second account
  const twosigs = algosdk.appendSignMultisigTransaction(
    rawSignedTxn,
    mparams,
    accountB.sk
  ).blob;
  //submit the transaction
  await algodClient.sendRawTransaction(twosigs).do();

  // Wait for transaction to be confirmed
  const confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 40);
  //Get the completed Transaction
  console.log(
    `Transaction ${txId} confirmed in round ${confirmedTxn['confirmed-round']}`
  );
};

const main = async () => {
  await sendFund();
  await submitMultisig();
};

(async () => {
  await main();
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
