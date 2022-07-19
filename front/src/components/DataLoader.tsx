//import { useState, useMemo } from 'react';

//import sleep from './sleep';
import useData1 from './useData1';

const DataLoader = () => {
  const data = useData1();

  return (
    <div>
      <div>Data is {data}</div>
    </div>
  );
};

export default DataLoader;
