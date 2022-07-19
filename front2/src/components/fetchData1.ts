import sleep from './sleep';

const fetchData1 = async () => {
  await sleep(1000);
  return `Hello, ${(Math.random() * 1000).toFixed(0)}`;
};

export default fetchData1;
