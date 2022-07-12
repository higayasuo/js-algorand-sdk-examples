import 'dotenv/config';
import pinatasdk from '@pinata/sdk';

export const getPinata = () => {
  return pinatasdk(
    process.env.PINATA_API_KEY || '',
    process.env.PINATA_API_SECRET || ''
  );
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
