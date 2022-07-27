import WalletConnect from '@walletconnect/client';
import QRCodeModal from 'algorand-walletconnect-qrcode-modal';
import { useRecoilState } from 'recoil';
import { useErrorHandler } from 'react-error-boundary';

import walletStateState from '../lib/states/walletStateState';
import { useEffect } from 'react';

const BRIDGE = 'https://bridge.walletconnect.org';

const useMainHook = () => {
  const [walletState, setWalletState] = useRecoilState(walletStateState);
  const { address } = walletState;
  const errorHandler = useErrorHandler();

  useEffect(() => {
    const connector = new WalletConnect({
      bridge: BRIDGE,
      qrcodeModal: QRCodeModal,
    });

    connector.on('connect', (error, payload) => {
      console.log(`connector.on("connect")`);

      if (error) {
        errorHandler(error);
        return;
      }

      const { accounts } = payload.params[0];
      const address = accounts[0];

      setWalletState((prev) => ({
        ...prev,
        address,
      }));
    });

    connector.on('disconnect', (error) => {
      console.log(`connector.on("disconnect")`);

      if (error) {
        errorHandler(error);
        return;
      }

      setWalletState((prev) => ({
        ...prev,
        address: undefined,
      }));
    });

    if (connector.connected) {
      const { accounts } = connector;
      const address = accounts[0];

      setWalletState({
        connector,
        address,
      });
    } else {
      setWalletState({
        connector,
        address: undefined,
      });
    }
  }, [setWalletState, errorHandler]);

  const onConnectWallet = () => {
    const { connector } = walletState;

    if (connector && !connector.connected) {
      connector.createSession().catch(errorHandler);
    }
  };

  const onDisconnectWallet = () => {
    const { connector } = walletState;

    if (connector) {
      connector.killSession().catch(errorHandler);
    }
  };

  return { address, onConnectWallet, onDisconnectWallet };
};

export default useMainHook;
