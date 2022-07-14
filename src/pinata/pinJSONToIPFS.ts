import { pinJSONToIPFS } from './pinataHelper';
import convertCidV0ToHash from '@/utils/convertCidV0ToHash';

const main = async () => {
  const body = {
    message: 'Hello',
  };

  const ret = await pinJSONToIPFS(body);

  console.log(ret);
  console.log(convertCidV0ToHash(ret.IpfsHash));
  console.log(`https://ipfs.io/ipfs/${ret.IpfsHash}`);
};

if (require.main === module) {
  (async () => {
    await main();
    process.exit(0);
  })().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
