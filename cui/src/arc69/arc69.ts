import fs from 'fs';
import { join, dirname } from 'path';
import { TextEncoder } from 'util';

import algosdk from 'algosdk';

import { test1Account } from '../account/accounts';
import { createAlgodClient, signSendWaitTxn } from '../utils/algoHelper';
import { pinFileToIPFS } from '../utils/pinataHelper';

type NFTParamsType = {
  assetURL: string;
  assetMetadataHash: Uint8Array;
  note: Uint8Array;
};

const prepareNFT = async (): Promise<NFTParamsType> => {
  const metadata = {
    standard: 'arc69',
    description: 'arc69',
    external_url: 'https://github.com/higayasuo/js-algorand-sdk-examples',
    mime_type: 'image/png',
  };
  const note = new TextEncoder().encode(JSON.stringify(metadata));

  const imagePath = join(dirname(dirname(__dirname)), 'img', 'test.png');
  const imageReadable = fs.createReadStream(imagePath);
  const imageRet = await pinFileToIPFS(imageReadable);

  return {
    assetURL: `ipfs://${imageRet.cid}#i`,
    assetMetadataHash: imageRet.blob,
    note,
  };
};

const createNFT = async ({
  assetURL,
  assetMetadataHash,
  note,
}: NFTParamsType) => {
  console.log('createNFT:', assetURL);

  const algodClient = createAlgodClient();
  const account = test1Account;

  console.log('Creator Address:', account.addr);

  const suggestedParams = await algodClient.getTransactionParams().do();
  const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    from: account.addr,
    total: 1,
    decimals: 0,
    assetName: 'ARC69',
    unitName: 'ARC69',
    assetURL,
    assetMetadataHash,
    defaultFrozen: false,
    manager: account.addr,
    note,
    suggestedParams,
  });

  const ctxResult = await signSendWaitTxn(algodClient, txn, account.sk);
  const assetID = ctxResult['asset-index'];

  console.log('Asset ID:', assetID);
};

const main = async () => {
  const params = await prepareNFT();
  await createNFT(params);
};

(async () => {
  await main();
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
