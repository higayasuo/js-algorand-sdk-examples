import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';

import todoListFilterState from '../states/todoListFilterState';

const TodoListFilters = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const onChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setFilter(value);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={onChange}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
};

export default TodoListFilters;
