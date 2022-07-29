import fs from 'fs';
import { join, dirname } from 'path';

import algosdk from 'algosdk';

import { test1Account } from '../account/accounts';
import { createAlgodClient, signSendWaitTxn } from '../utils/algoHelper';
import { pinFileToIPFS, pinJSONToIPFS } from '../utils/pinataHelper';

type NFTParamsType = {
  assetName: string;
  assetURL: string;
  assetMetadataHash: Uint8Array;
};

const prepareNFT = async (): Promise<NFTParamsType> => {
  const metadata = {
    name: 'test-music@arc3',
    description: 'js-algorand-sdk-examples for Music NFT',
    image: 'ipfs://',
    image_integrity: 'sha256-',
    image_mimetype: 'image/png',
    external_url: 'https://github.com/higayasuo/js-algorand-sdk-examples',
    animation_url: 'ipfs://',
    animation_url_integrity: 'sha256-',
    animation_url_mimetype: 'audio/mpeg',
  };

  const imagePath = join(dirname(dirname(__dirname)), 'img', 'test.png');
  const imageReadable = fs.createReadStream(imagePath);
  const imageRet = await pinFileToIPFS(imageReadable);

  metadata.image = `ipfs://${imageRet.cid}`;
  metadata.image_integrity = `sha256-${imageRet.base64}`;

  const audioPath = join(dirname(dirname(__dirname)), 'audio', 'test.mp3');
  const audioReadable = fs.createReadStream(audioPath);
  const audioRet = await pinFileToIPFS(audioReadable);

  metadata.animation_url = `ipfs://${audioRet.cid}`;
  metadata.animation_url_integrity = `sha256-${audioRet.base64}`;

  const metadataRet = await pinJSONToIPFS(metadata);

  return {
    assetName: metadata.name,
    assetURL: `ipfs://${metadataRet.cid}`,
    assetMetadataHash: metadataRet.blob,
  };
};

const createNFT = async ({
  assetName,
  assetURL,
  assetMetadataHash,
}: NFTParamsType) => {
  console.log('createNFT:', assetName, assetURL);

  const algodClient = createAlgodClient();
  const account = test1Account;

  console.log('Creator Address:', account.addr);

  const suggestedParams = await algodClient.getTransactionParams().do();
  const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    from: account.addr,
    total: 1,
    decimals: 0,
    assetName,
    unitName: 'TEST',
    assetURL,
    assetMetadataHash,
    defaultFrozen: false,
    manager: account.addr,
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
