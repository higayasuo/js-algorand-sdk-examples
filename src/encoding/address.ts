import algosdk from 'algosdk';

const main = async () => {
  const address = '4H5UNRBJ2Q6JENAXQ6HNTGKLKINP4J4VTQBEPK5F3I6RDICMZBPGNH6KD4';
  const pk = algosdk.decodeAddress(address);

  console.log(pk);

  const addr = algosdk.encodeAddress(pk.publicKey);

  console.log('Address:', addr);
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
