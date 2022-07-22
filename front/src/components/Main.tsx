import useHook from './Main.hook';

const Main = () => {
  const { state, onConnectWallet, onDisconnectWallet } = useHook();

  return (
    <>
      <div>{JSON.stringify(state, null, 2)}</div>
      <button className="border-2 p-2" onClick={onConnectWallet}>
        Connect to Wallet
      </button>
      <button className="border-2 p-2" onClick={onDisconnectWallet}>
        Disconnect to Wallet
      </button>
    </>
  );
};

export default Main;
