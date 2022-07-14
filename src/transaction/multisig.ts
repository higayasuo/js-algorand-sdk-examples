import * as algosdk from 'algosdk';

import {
  accountB,
  createAlgodClient,
  sendRawTxnAndWait,
} from '@/utils/algoHelper';

import pressKey from '@/utils/pressKey';

const account1 = algosdk.generateAccount();
const account2 = algosdk.generateAccount();
const account3 = algosdk.generateAccount();

const maccount: algosdk.MultiSigAccount = {
  version: 1,
  threshold: 2,
  addrs: [account1.addr, account2.addr, account3.addr],
};

const multisigAddr = algosdk.multisigAddress(maccount);
console.log('Multisig Address: ' + multisigAddr);

const sendFund = async () => {
  console.log('Run the following command and enter the line feed code');
  console.log(
    `./sandbox goal clerk send -f ${accountB.addr}  -t ${multisigAddr} -a 2000000`
  );
  await pressKey();
};

const submitMultisig = async () => {
  const algodClient = createAlgodClient();
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

  const signedTxnBlob = algosdk.signMultisigTransaction(
    txn,
    maccount,
    account1.sk
  ).blob;
  const twoSignedTxnBlob = algosdk.appendSignMultisigTransaction(
    signedTxnBlob,
    maccount,
    account2.sk
  ).blob;

  await sendRawTxnAndWait(algodClient, twoSignedTxnBlob);
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
