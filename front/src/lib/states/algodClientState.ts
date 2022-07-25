import algosdk from 'algosdk';
import { selector, snapshot_UNSTABLE } from 'recoil';
import { ChainType } from '../types';
import chainState from './chainState';

const mainNetClient = new algosdk.Algodv2(
  '',
  'https://node.algoexplorerapi.io',
  443
);
const testNetClient = new algosdk.Algodv2(
  '',
  'https://node.testnet.algoexplorerapi.io',
  443
);

const algodClientState = selector({
  key: 'AlgodClientState',
  get: ({ get }) => {
    const chain = get(chainState);

    if (chain === ChainType.MainNet) {
      return mainNetClient;
    }

    return testNetClient;
  },
});

export default algodClientState;
