import { ChangeEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import chainState from '../lib/states/chainState';
import walletStateState from '../lib/states/walletStateState';
import { ChainType } from '../lib/types';

const useHook = () => {
  const { address } = useRecoilValue(walletStateState);
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

  return { address, chain, chainValueLabels, onChangeChain };
};

export default useHook;
