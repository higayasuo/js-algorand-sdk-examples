import createAsset from './createAsset';
import freezeAsset from './freezeAsset';
import modifyAsset from './modifyAsset';
import optinAsset from './optinAsset';
import revokeAsset from './revokeAsset';
import transferAsset from './transferAsset';

const main = async () => {
  const assetIndex = await createAsset();
  await modifyAsset(assetIndex);
  await optinAsset(assetIndex);
  await transferAsset(assetIndex);
  await freezeAsset(assetIndex);
  await revokeAsset(assetIndex);
};

(async () => {
  await main();
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
