import fetchData1 from './fetchData1';

let data: string | undefined = undefined;

const useData1 = () => {
  if (data === undefined) {
    throw fetchData1().then((d) => (data = d));
  }

  return data;
};

export default useData1;
