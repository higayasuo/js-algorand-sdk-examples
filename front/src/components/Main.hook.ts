import WalletConnect from '@walletconnect/client';
import QRCodeModal from 'algorand-walletconnect-qrcode-modal';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { useErrorHandler } from 'react-error-boundary';

import walletState, {
  initialState,
  WalletStateType,
} from '../lib/states/walletState';
import { ErrorHandlerType } from '../lib/types';

const BRIDGE = 'https://bridge.walletconnect.org';

const subscribeToConnect = (
  connector: WalletConnect,
  setState: SetterOrUpdater<WalletStateType>,
  errorHandler: ErrorHandlerType
) => {
  connector.on('connect', (error, payload) => {
    console.log(`connector.on("connect")`);

    if (error) {
      errorHandler(error);
      return;
    }

    const { accounts } = payload.params[0];
    const address = accounts[0];

    setState((prev) => ({
      ...prev,
      address,
      connected: true,
    }));
  });
};

const subscribeToSessionUpdate = (
  connector: WalletConnect,
  setState: SetterOrUpdater<WalletStateType>,
  errorHandler: ErrorHandlerType
) => {
  connector.on('session_update', async (error, payload) => {
    console.log(`connector.on("session_update")`);

    if (error) {
      errorHandler(error);
      return;
    }

    const { accounts } = payload.params[0];
    const address = accounts[0];

    setState((prev) => ({
      ...prev,
      address,
    }));
  });
};

const subscribeToDisconnect = (
  connector: WalletConnect,
  setState: SetterOrUpdater<WalletStateType>,
  errorHandler: ErrorHandlerType
) => {
  connector.on('disconnect', (error) => {
    console.log(`connector.on("disconnect")`);

    if (error) {
      errorHandler(error);
      return;
    }

    setState({ ...initialState });
  });
};

const connectWallet = (
  setState: SetterOrUpdater<WalletStateType>,
  errorHandler: ErrorHandlerType
) => {
  const connector = new WalletConnect({
    bridge: BRIDGE,
    qrcodeModal: QRCodeModal,
  });

  subscribeToConnect(connector, setState, errorHandler);
  subscribeToSessionUpdate(connector, setState, errorHandler);
  subscribeToDisconnect(connector, setState, errorHandler);

  if (!connector.connected) {
    setState({
      connector,
      address: undefined,
      connected: false,
    });

    connector.createSession().catch(errorHandler);
  } else {
    const { accounts } = connector;
    const address = accounts[0];

    setState({
      connector,
      address,
      connected: true,
    });
  }
};

const disonnectWallet = (connector?: WalletConnect) => {
  if (!connector) {
    return;
  }

  connector.killSession();
};

const useHook = () => {
  const [state, setState] = useRecoilState(walletState);
  const errorHandler = useErrorHandler();
  const onConnectWallet = () => {
    connectWallet(setState, errorHandler);
  };
  const onDisconnectWallet = () => {
    disonnectWallet(state.connector);
  };

  return { state, onConnectWallet, onDisconnectWallet };
};

export default useHook;
