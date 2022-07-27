import useHeaderHook from './Header.hook';
import shortenAddress from '../lib/utils/shortenAddress';

const Header = () => {
  const { address, chain, onChangeChain, chainValueLabels } = useHeaderHook();
  const Select = () => (
    <select onChange={onChangeChain} value={chain} className="border-2 block">
      {chainValueLabels.map((vl) => (
        <option key={vl.label} value={vl.value}>
          {vl.label}
        </option>
      ))}
    </select>
  );
  return (
    <div className="flex justify-between m-2">
      <Select />
      {address && <div>{shortenAddress(address)}</div>}
    </div>
  );
};

export default Header;
