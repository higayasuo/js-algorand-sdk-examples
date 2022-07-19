import { RecoilRoot } from 'recoil';

//import TodoList from './components/TodoList';
//import SometimesSuspend from './components/SometimesSuspend';
import { Suspense } from 'react';
import DataLoader from './components/DataLoader';

const App = () => {
  return (
    <RecoilRoot>
      {/* <TodoList /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <DataLoader />
      </Suspense>
    </RecoilRoot>
  );
};

export default App;
