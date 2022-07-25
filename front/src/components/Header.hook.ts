import { ChangeEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import chainState from '../lib/states/chainState';
import walletState from '../lib/states/walletState';
import { ChainType } from '../lib/types';

const useHook = () => {
  const { connected, address } = useRecoilValue(walletState);
  const [chain, setChain] = useRecoilState(chainState);

  const chainValueLabels = [
    {
      value: ChainType.TestNet,
      label: ChainType.TestNet.toString(),
    },
    {
      value: ChainType.MainNet,
      label: ChainType.MainNet.toString(),
    },
  ];
  const onChangeChain = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;

    if (val === ChainType.TestNet.toString()) {
      setChain(ChainType.TestNet);
    } else {
      setChain(ChainType.MainNet);
    }
  };

  return { connected, address, chain, chainValueLabels, onChangeChain };
};

export default useHook;
