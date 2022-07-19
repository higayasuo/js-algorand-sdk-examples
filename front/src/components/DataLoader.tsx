//import { useState, useMemo } from 'react';
import useData1 from './useData1';

const DataLoader = () => {
  const data = useData1();

  if (data) {
    return <div>Data is {data}</div>;
  } else {
    return <div>Loading...</div>;
  }
};

export default DataLoader;
