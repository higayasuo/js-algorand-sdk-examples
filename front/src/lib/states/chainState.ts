import { atom } from 'recoil';
import { ChainType } from '../types';

const chainState = atom({
  key: 'ChainState',
  default: ChainType.TestNet,
});

export default chainState;
