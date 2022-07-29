import bs58 from 'bs58';

const convertCidV0ToHash = (cid: string) => {
  const blob = bs58.decode(cid).slice(2);
  const base64 = Buffer.from(blob).toString('base64');

  return { base64, blob };
};

export default convertCidV0ToHash;
