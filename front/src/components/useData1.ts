import { useEffect, useState } from 'react';
import fetchData1 from './fetchData1';

const useData1 = () => {
  const [data, setData] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      setData(await fetchData1());
    })();
  }, []);

  return data;
};

export default useData1;
