import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { TodoType } from '../types';
import todoListState from '../states/todoListState';

type TodoItemParamsType = {
  todo: TodoType;
};

const TodoItem = ({ todo }: TodoItemParamsType) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((e) => e.id === todo.id);

  const onEdit = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const newTodoList = [...todoList];

    newTodoList[index].text = value;

    setTodoList(newTodoList);
  };

  const onToggle = () => {
    const newTodoList = [...todoList];

    newTodoList[index].isComplete = !todo.isComplete;

    setTodoList(newTodoList);
  };

  const onDelete = () => {
    const newTodoList = [...todoList];

    newTodoList.splice(index, 1);

    setTodoList(newTodoList);
  };

  return (
    <div>
      <input
        type="text"
        value={todo.text}
        onChange={onEdit}
        className="border-2"
      />
      <input type="checkbox" checked={todo.isComplete} onChange={onToggle} />
      <button onClick={onDelete}>X</button>
    </div>
  );
};

export default TodoItem;
