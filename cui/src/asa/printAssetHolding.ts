import { createAlgodClient } from '../utils/algoHelper';

const printAssetHolding = async (address: string, assetID: number) => {
  console.log('Asset Holding Information:', address);

  const algodClient = createAlgodClient();
  const info = await algodClient.accountInformation(address).do();

  const asset = info['assets'].find((as) => as['asset-id'] === assetID);

  if (asset) {
    console.log('AssetID:', assetID);
    console.log(JSON.stringify(asset, undefined, 2));
  } else {
    console.log('AssetID:', assetID, 'not found');
  }
};

export default printAssetHolding;
