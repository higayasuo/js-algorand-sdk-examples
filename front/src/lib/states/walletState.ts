import WalletConnect from '@walletconnect/client';
import { atom } from 'recoil';

export type WalletStateType = {
  connector?: WalletConnect;
  connected: boolean;
  address?: string;
};

export const initialState: WalletStateType = {
  connected: false,
};

const walletState = atom<WalletStateType>({
  key: 'WalletState',
  default: { ...initialState },
  dangerouslyAllowMutability: true,
});

export default walletState;
