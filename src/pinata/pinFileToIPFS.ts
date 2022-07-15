import { join, dirname } from 'path';
import fs from 'fs';

import { pinFileToIPFS } from '@/utils/pinataHelper';

const main = async () => {
  const readable = fs.createReadStream(
    join(dirname(dirname(__dirname)), 'img', 'test.png')
  );

  const ret = await pinFileToIPFS(readable);

  console.log(ret);
  console.log(`https://ipfs.io/ipfs/${ret.cid}`);
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
