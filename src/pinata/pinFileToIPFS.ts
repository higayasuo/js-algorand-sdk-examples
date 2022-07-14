import { join, dirname } from 'path';
import fs from 'fs';

import { pinFileToIPFS } from '@/utils/pinataHelper';
import convertCidV0ToHash from '@/utils/convertCidV0ToHash';

const main = async () => {
  const readable = fs.createReadStream(
    join(dirname(dirname(__dirname)), 'img', 'test.png')
  );

  const ret = await pinFileToIPFS(readable);

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
