import algosdk from 'algosdk';

const main = async () => {
  const val = 1337;

  console.log('val:', val);

  const encoded = algosdk.encodeUint64(val);

  console.log('encoded:', encoded);

  const decoded = algosdk.decodeUint64(encoded);

  console.log('decoded:', decoded);
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

export {};
