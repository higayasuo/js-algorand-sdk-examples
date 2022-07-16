const main = async () => {
  const original = 'Hello World!';

  console.log('original:', original);

  const encoded = Buffer.from(original).toString('base64');

  console.log('encoded:', encoded);

  const decoded = Buffer.from(encoded, 'base64').toString();

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
