import { createAlgodClient } from '../utils/algoHelper';

const printCreatedAsset = async (address: string, assetID: number) => {
  console.log('Created Asset Information:', address);

  const algodClient = createAlgodClient();
  const info = await algodClient.accountInformation(address).do();

  const asset = info['created-assets'].find((as) => as.index === assetID);

  if (asset) {
    console.log('AssetID:', assetID);
    console.log(JSON.stringify(asset.params, undefined, 2));
  } else {
    console.log('AssetID:', assetID, 'not found');
  }
};

export default printCreatedAsset;
