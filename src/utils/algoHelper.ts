import * as algosdk from 'algosdk';

const SERVER = 'http://localhost';
const TESTNET_SERVER = 'https://node.testnet.algoexplorerapi.io';
const TOKEN =
  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

const ALGOD_PORT = 4001;
const KMD_PORT = 4002;

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

export const createTestnetAlgodClient = () => {
  return new algosdk.Algodv2('', TESTNET_SERVER, 443);
};

export const createKmdClient = () => {
  return new algosdk.Kmd(TOKEN, SERVER, KMD_PORT);
};

export const sendWaitTxn = async (
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

export const signSendWaitTxn = async (
  algodClient: algosdk.Algodv2,
  txn: algosdk.Transaction,
  sk: Uint8Array
) => {
  const stxn = txn.signTxn(sk);

  return sendWaitTxn(algodClient, stxn);
};

const main = async () => {
  const algodClient = createTestnetAlgodClient();

  console.log(await algodClient.getTransactionParams().do());
};

if (require.main === module) {
  (async () => {
    await main();
    process.exit(0);
  })().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
