import { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useRecoilValue } from 'recoil';
import getAccountAssets, { AccountAsset } from '../lib/api/getAccountAssets';
import algodClientState from '../lib/states/algodClientState';
import walletStateState from '../lib/states/walletStateState';

const initialState: AccountAsset[] = [];

const useAccountAssetsHook = () => {
  const [assets, setAssets] = useState<AccountAsset[]>([...initialState]);
  const client = useRecoilValue(algodClientState);
  const { address } = useRecoilValue(walletStateState);
  const errorHandler = useErrorHandler();

  useEffect(() => {
    if (address) {
      getAccountAssets(client, address).then(setAssets).catch(errorHandler);
    } else {
      setAssets([...initialState]);
    }
  }, [client, address, errorHandler]);

  return { assets };
};

export default useAccountAssetsHook;
