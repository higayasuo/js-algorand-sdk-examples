import formatBigintWithDecimals from '../lib/utils/formatBigintWithDecimals';
import useAccountAssetsHook from './AccountAssets.hook';

const AccountAssets = () => {
  const { assets } = useAccountAssetsHook();

  return (
    <div className="my-4 max-h-96 overflow-y-scroll">
      <div>
        <span className="w-32 md:w-60 inline-block">Name</span>
        <span className="w-24 inline-block">Balance</span>
      </div>
      <hr />
      {assets.map((asset) => (
        <div key={asset.id} className="mb-4">
          <span className="w-32 md:w-60 inline-block">{asset.name}</span>
          <span className="w-24 inline-block text-right">
            {formatBigintWithDecimals(asset.amount, asset.decimals)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AccountAssets;
