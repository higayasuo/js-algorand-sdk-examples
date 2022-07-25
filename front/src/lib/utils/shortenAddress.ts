const shortenAddress = (address = '', width = 6) => {
  return `${address.slice(0, width)}...${address.slice(-width)}`;
};

export default shortenAddress;
