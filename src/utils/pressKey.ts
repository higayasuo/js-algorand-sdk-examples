const pressKey = async () => {
  process.stdin.setRawMode(true);
  return new Promise<void>((resolve) =>
    process.stdin.once('data', () => {
      process.stdin.setRawMode(false);
      resolve();
    })
  );
};

const main = async () => {
  console.log('Press key');

  await pressKey();

  console.log('key pressed');
};

if (require.main === module) {
  (async () => {
    await main();
    process.exit();
  })();
}

export default pressKey;
