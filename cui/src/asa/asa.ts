import createAsset from './createAsset';
import destroyAsset from './destroyAsset';
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
  await destroyAsset(assetIndex);
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
