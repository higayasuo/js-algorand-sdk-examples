import { Readable } from 'stream';
import convertCidV0ToHash from './convertCidV0ToHash';

import 'dotenv/config';
import pinatasdk from '@pinata/sdk';

const ZERO: 0 | 1 | undefined = 0;

const OPTIONS = {
  pinataOptions: {
    cidVersion: ZERO,
  },
};

export const getPinata = () => {
  return pinatasdk(
    process.env.PINATA_API_KEY || '',
    process.env.PINATA_API_SECRET || ''
  );
};

export const pinJSONToIPFS = async (body: object) => {
  const pinata = getPinata();

  const res = await pinata.pinJSONToIPFS(body, OPTIONS);
  const hash = convertCidV0ToHash(res.IpfsHash);

  return { cid: res.IpfsHash, base64: hash.base64, blob: hash.blob };
};

export const pinFileToIPFS = async (readable: Readable) => {
  const pinata = getPinata();

  const res = await pinata.pinFileToIPFS(readable, OPTIONS);
  const hash = convertCidV0ToHash(res.IpfsHash);

  return { cid: res.IpfsHash, base64: hash.base64, blob: hash.blob };
};

const main = async () => {
  const pinata = getPinata();

  console.log(await pinata.testAuthentication());
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
