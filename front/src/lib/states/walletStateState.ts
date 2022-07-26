import WalletConnect from '@walletconnect/client';
import { atom } from 'recoil';

export type WalletStateType = {
  connector: WalletConnect | undefined;
  address: string | undefined;
};

export const initialState: WalletStateType = {
  connector: undefined,
  address: undefined,
};

const walletStateState = atom<WalletStateType>({
  key: 'WalletStateState',
  default: { ...initialState },
  dangerouslyAllowMutability: true,
});

export default walletStateState;
