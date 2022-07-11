import * as algosdk from 'algosdk';

export const SERVER = 'http://localhost';
export const TOKEN =
  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

export const ALGOD_PORT = 4001;
export const KMD_PORT = 4002;

const MN1 =
  'birth april scatter wide stool resist song hobby unaware rabbit marine convince goat planet exhaust size visual cupboard squirrel isolate obvious will tennis about maple';

const MN2 =
  'similar solution pepper old sand trend twin joke dolphin tank salad shoe across latin robust broccoli hold exact kite sorry follow man excite absent magic';

const MN3 =
  'fever youth tiny fog friend burden police guess text arrange bridge pen warrior volcano forward position club fabric shrug moment rotate rotate armor absent hedgehog';

export const accountA = algosdk.mnemonicToSecretKey(MN1);
export const accountB = algosdk.mnemonicToSecretKey(MN2);
export const accountC = algosdk.mnemonicToSecretKey(MN3);

export const createAlgodClient = () => {
  return new algosdk.Algodv2(TOKEN, SERVER, ALGOD_PORT);
};

export const createKmdClient = () => {
  return new algosdk.Kmd(TOKEN, SERVER, KMD_PORT);
};

export const sendRawTxnAndWait = async (
  algodClient: algosdk.Algodv2,
  signedTxn: Uint8Array | Uint8Array[]
) => {
  const txResult = await algodClient.sendRawTransaction(signedTxn).do();
  const ctxResult = await algosdk.waitForConfirmation(
    algodClient,
    txResult.txId,
    10
  );

  console.log(
    'Transaction ' +
      txResult.txId +
      ' confirmed in round ' +
      ctxResult['confirmed-round']
  );

  return ctxResult;
};

export const sendTxnAndWait = async (
  algodClient: algosdk.Algodv2,
  txn: algosdk.Transaction,
  sk: Uint8Array
) => {
  const signedTx = txn.signTxn(sk);

  return sendRawTxnAndWait(algodClient, signedTx);
};
