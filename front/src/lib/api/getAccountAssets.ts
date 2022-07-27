import algosdk, { Algodv2 } from 'algosdk';
import { Unarray, Unpromise } from '../types';

const getAccountAssets = async (client: Algodv2, address: string) => {
  const accountInfo = await client
    .accountInformation(address)
    .setIntDecoding(algosdk.IntDecoding.BIGINT)
    .do();

  const algoBalance = accountInfo.amount as bigint;

  const assets = await Promise.all(
    accountInfo.assets.map(async (asset) => {
      const id = Number(asset['asset-id']);
      const { creator, frozen } = asset;
      const amount = asset.amount as bigint;

      const { params } = await client.getAssetByID(id).do();
      const { name, 'unit-name': unitName, url, decimals } = params;

      return {
        id,
        amount,
        creator,
        frozen,
        name,
        unitName,
        url,
        decimals,
      };
    })
  );

  assets.sort((a, b) => a.id - b.id);

  assets.unshift({
    id: 0,
    amount: algoBalance,
    creator: '',
    frozen: false,
    decimals: 6,
    name: 'Algo',
    unitName: 'Algo',
    url: '',
  });

  return assets;
};

export type AccountAsset = Unarray<
  Unpromise<ReturnType<typeof getAccountAssets>>
>;

export default getAccountAssets;
