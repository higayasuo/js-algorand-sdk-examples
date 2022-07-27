import AccountAssets from './AccountAssets';
import Header from './Header';
import useMainHook from './Main.hook';

const Main = () => {
  const { address, onConnectWallet, onDisconnectWallet } = useMainHook();

  return (
    <div className="p-4 max-w-screen-sm">
      <Header />
      <AccountAssets />
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
    </div>
  );
};

export default Main;
