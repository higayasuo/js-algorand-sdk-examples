import { createAlgodClient } from '@/utils/helper';

const printAssetHolding = async (address: string, assetid: number) => {
  const algodClient = createAlgodClient();
  const info = await algodClient.accountInformation(address).do();

  info['assets'].forEach((asset) => {
    if (asset['asset-id'] === assetid) {
      const assetJson = JSON.stringify(asset, undefined, 2);
      console.log(`assetHoldingInfo = ${assetJson}`);
    }
  });
};

export default printAssetHolding;
