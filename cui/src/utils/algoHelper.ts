import algosdk from 'algosdk';

const TESTNET_SERVER = 'https://node.testnet.algoexplorerapi.io';

export const createAlgodClient = () => {
  return new algosdk.Algodv2('', TESTNET_SERVER, 443);
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
  const algodClient = createAlgodClient();

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
