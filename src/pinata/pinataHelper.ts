import 'dotenv/config';

const main = async () => {
  console.log(process.env.AAA, process.env.BBB);
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
