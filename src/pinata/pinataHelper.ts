import { Readable } from 'stream';

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

  return pinata.pinJSONToIPFS(body, OPTIONS);
};

export const pinFileToIPFS = async (readable: Readable) => {
  const pinata = getPinata();

  return pinata.pinFileToIPFS(readable, OPTIONS);
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
