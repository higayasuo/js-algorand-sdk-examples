import { accountB, algodClient, algosdk } from '@/utils/helper';

import pressKey from '@/utils/pressKey';

const account1 = algosdk.generateAccount();
const account2 = algosdk.generateAccount();
const account3 = algosdk.generateAccount();

const mparams = {
  version: 1,
  threshold: 2,
  addrs: [account1.addr, account2.addr, account3.addr],
};

const multisigAddr = algosdk.multisigAddress(mparams);
console.log('Multisig Address: ' + multisigAddr);

const sendFund = async () => {
  console.log('Run the following command');
  console.log(
    `./sandbox goal clerk send -f ${accountB.addr}  -t ${multisigAddr} -a 2000000`
  );
  await pressKey();
};

const submitMultisig = async () => {
  // get suggested params from the network
  const params = await algodClient.getTransactionParams().do();

  const receiver = account3.addr;

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
    account1.sk
  ).blob;
  //sign with second account
  const twosigs = algosdk.appendSignMultisigTransaction(
    rawSignedTxn,
    mparams,
    account2.sk
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
