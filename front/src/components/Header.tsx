import useHook from './Header.hook';
import shortenAddress from '../lib/utils/shortenAddress';

const Header = () => {
  const { connected, address, chain, onChangeChain, chainValueLabels } =
    useHook();
  const Select = () => (
    <select onChange={onChangeChain} value={chain} className="border-2 block">
      {chainValueLabels.map((vl) => (
        <option key={vl.label} value={vl.value}>
          {vl.label}
        </option>
      ))}
    </select>
  );
  const Content = () => (
    <div className="flex justify-between m-2">
      <Select />
      <div>{shortenAddress(address)}</div>
    </div>
  );
  return <>{connected && <Content />}</>;
};

export default Header;
