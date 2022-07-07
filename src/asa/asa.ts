import createAsset from './createAsset';
import modifyAsset from './modifyAsset';

const main = async () => {
  const assetIndex = await createAsset();
  await modifyAsset(assetIndex);
};

(async () => {
  await main();
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
