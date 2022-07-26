import Header from './Header';
import useHook from './Main.hook';

const Main = () => {
  const { address, onConnectWallet, onDisconnectWallet } = useHook();

  return (
    <>
      <Header />
      {!address && (
        <button className="border-2 p-2" onClick={onConnectWallet}>
          Connect to Wallet
        </button>
      )}
      {address && (
        <button className="border-2 p-2" onClick={onDisconnectWallet}>
          Disconnect to Wallet
        </button>
      )}
    </>
  );
};

export default Main;
