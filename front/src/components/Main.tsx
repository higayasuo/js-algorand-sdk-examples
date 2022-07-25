import Header from './Header';
import useHook from './Main.hook';

const Main = () => {
  const { state, onConnectWallet, onDisconnectWallet } = useHook();

  return (
    <>
      <Header />
      {!state.connected && (
        <button className="border-2 p-2" onClick={onConnectWallet}>
          Connect to Wallet
        </button>
      )}
      {state.connected && (
        <button className="border-2 p-2" onClick={onDisconnectWallet}>
          Disconnect to Wallet
        </button>
      )}
    </>
  );
};

export default Main;
