import { useRecoilValue } from 'recoil';

import filteredTodoListState from '../states/filteredTodoListState';
import TodoItemCreator from './TodoItemCreator';
import TodoListFilters from './TodoListFilters';
import TodoItem from './TodoItem';

const TodoList = () => {
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <>
      {/* <TodoListStats /> */}
      <TodoListFilters />
      <TodoItemCreator />

      {todoList.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </>
  );
};

export default TodoList;
