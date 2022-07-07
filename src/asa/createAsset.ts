import { accountA, accountB, algodClient, algosdk } from '@/utils/helper';
import printCreatedAsset from './printCreatedAsset';

const createAsset = async () => {
  const params = await algodClient.getTransactionParams().do();

  // Whether user accounts will need to be unfrozen before transacting
  const defaultFrozen = false;
  // integer number of decimals for asset unit calculation
  const decimals = 0;
  // total number of this asset available for circulation
  const totalIssuance = 1000;
  // Used to display asset units to user
  const unitName = 'LATINUM';
  // Friendly name of the asset
  const assetName = 'latinum';
  // Optional string pointing to a URL relating to the asset
  const assetURL = 'http://someurl';
  // Optional hash commitment of some sort relating to the asset. 32 character length.
  const assetMetadataHash = '16efaa3924a6fd9d3a4824799a4ac65d';
  // The following parameters are the only ones
  // that can be changed, and they have to be changed
  // by the current manager
  // Specified address can change reserve, freeze, clawback, and manager
  const manager = accountB.addr;
  // Specified address is considered the asset reserve
  // (it has no special privileges, this is only informational)
  const reserve = accountB.addr;
  // Specified address can freeze or unfreeze user asset holdings
  const freeze = accountB.addr;
  // Specified address can revoke user asset holdings and send
  // them to other addresses
  const clawback = accountB.addr;

  // signing and sending "txn" allows "addr" to create an asset
  const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
    accountA.addr,
    undefined,
    totalIssuance,
    decimals,
    defaultFrozen,
    manager,
    reserve,
    freeze,
    clawback,
    unitName,
    assetName,
    assetURL,
    assetMetadataHash,
    params
  );

  const rawSignedTxn = txn.signTxn(accountA.sk);
  const tx = await algodClient.sendRawTransaction(rawSignedTxn).do();
  const ptx = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);

  console.log(
    'Transaction ' + tx.txId + ' confirmed in round ' + ptx['confirmed-round']
  );

  const assetIndex = ptx['asset-index'];

  printCreatedAsset(accountA.addr, assetIndex);

  return assetIndex;
};

export default createAsset;
