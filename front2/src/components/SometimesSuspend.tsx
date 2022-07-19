const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const SometimesSuspend = () => {
  if (Math.random() < 0.5) {
    throw sleep(1000);
  }

  return <p>Hello, world!</p>;
};

export default SometimesSuspend;
