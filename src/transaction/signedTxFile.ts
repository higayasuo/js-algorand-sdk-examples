import fs from 'fs';

import * as algosdk from 'algosdk';

import * as env from '@/env';

const algodClient = new algosdk.Algodv2(env.TOKEN, env.SERVER, env.ALGOD_PORT);

const MN1 =
  'dance turn spoon split interest brief dinosaur tunnel collect search orchard silent debris art clinic series hint dial inner define age beauty step absorb ladder';

const MN2 =
  'call finish repair coffee fatal cook finger fortune deputy scout biology pause kite spin typical improve island noise review category feed rapid total absent can';

const accountA = algosdk.mnemonicToSecretKey(MN1);
const accountB = algosdk.mnemonicToSecretKey(MN2);

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
  const signedTxn = txn.signTxn(accountA.sk);
  fs.writeFileSync('./signed.stxn', signedTxn);

  // read signed transaction from file
  const stx = fs.readFileSync('./signed.stxn');
  fs.unlinkSync('./signed.stxn');

  const tx = await algodClient.sendRawTransaction(stx).do();
  console.log('Signed transaction with txID: %s', tx.txId);
  // Wait for confirmation
  const confirmedTxn = await algosdk.waitForConfirmation(
    algodClient,
    tx.txId,
    4
  );
  //Get the completed Transaction
  console.log(
    'Transaction ' +
      tx.txId +
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
