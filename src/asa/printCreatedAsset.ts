import { createAlgodClient } from '@/utils/algoHelper';

const printCreatedAsset = async (address: string, assetid: number) => {
  const algodClient = createAlgodClient();
  const info = await algodClient.accountInformation(address).do();

  info['created-assets'].forEach((asset) => {
    if (asset.index === assetid) {
      console.log('AssetID = ' + asset.index);
      const myparms = JSON.stringify(asset.params, undefined, 2);
      console.log('parms = ' + myparms);
    }
  });
};

export default printCreatedAsset;
